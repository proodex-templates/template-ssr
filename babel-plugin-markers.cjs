const path = require("path");

const CONFIG = {
  allowedElements: [
    "h1","h2","h3","h4","h5","h6",
    "p","span","section","Textarea","Label","Input",
    "Icon","Image","LinkWrapper"
  ],
  excludedFolders: [
    "components/ui", 
    "utility", 
    "lib", 
    "styles", 
    "hooks", 
    "context", 
    "config", 
    "assets"
  ]
};

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "babel-plugin-markers",
    visitor: {
      JSXOpeningElement(nodePath, state) {
        const filename = state.file.opts.filename;
        if (!filename) {
          // Log if filename is missing entirely
          console.log("[DEBUG] JSXOpeningElement: filename is undefined", { nodePath: nodePath.node });
          return;
        }

        // --- 1. PATH VALIDATION & FILTERING ---
        const normalizedPath = filename.replace(/\\/g, "/");

        // Log initial path and checks
        // console.log(`[DEBUG] Processing: ${normalizedPath}`);

        if (!normalizedPath.includes("/src/")) {
          // console.log(`[DEBUG] Skipping (not in src): ${normalizedPath}`);
          return;
        }

        const srcIndex = normalizedPath.indexOf("/src/");
        if (srcIndex === -1) return; // Should not happen if includes("/src/") passed

        const relativeToSrc = normalizedPath.substring(srcIndex + 5); // +5 for "/src/"

        const isExcluded = CONFIG.excludedFolders.some(folder => 
          relativeToSrc.startsWith(`${folder}/`) || relativeToSrc === folder
        );

        if (isExcluded) {
          // console.log(`[DEBUG] Skipping (excluded folder): ${relativeToSrc}`);
          return;
        }

        // --- 2. ELEMENT IDENTIFICATION ---
        let name = "Unknown";
        const n = nodePath.node.name;
        if (t.isJSXIdentifier(n)) name = n.name;
        else if (t.isJSXMemberExpression(n)) name = n.object.name ?? "Unknown";

        if (!CONFIG.allowedElements.includes(name)) {
          // console.log(`[DEBUG] Skipping (not allowed element): ${name} in ${relativeToSrc}`);
          return;
        }
        
        const loc = nodePath.node.loc;
        if (!loc) {
          console.error(`[DEBUG] Error: No location found for ${name} in ${relativeToSrc}`);
          return;
        }

        // --- 3. ENCODE ID ---
        const rawId = `${relativeToSrc}|${loc.start.line}|${loc.end.line}`;
        const encoded = Buffer.from(rawId).toString('base64').replace(/=/g, "");
        const markerValue = `${name}-${encoded}`;

        // --- Log BEFORE injecting ---
        console.log(`[DEBUG] MARKER FOUND: ${markerValue}`);
        console.log(`[DEBUG]   File: ${relativeToSrc}`);
        console.log(`[DEBUG]   Element: ${name}`);
        console.log(`[DEBUG]   Location: Line ${loc.start.line} - ${loc.end.line}`);


        // --- 4. INJECT ATTRIBUTE ---
        const idx = nodePath.node.attributes.findIndex(
          a => t.isJSXAttribute(a) && a.name.name === "data-marker"
        );

        if (idx >= 0) {
          nodePath.node.attributes[idx].value = t.stringLiteral(markerValue);
        } else {
          nodePath.node.attributes.push(
            t.jsxAttribute(t.jsxIdentifier("data-marker"), t.stringLiteral(markerValue))
          );
        }
      }
    }
  };
};