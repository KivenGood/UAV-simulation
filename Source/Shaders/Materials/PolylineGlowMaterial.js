//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "uniform vec4 color;\n\
uniform float glowPower;\n\
\n\
varying float v_width;\n\
\n\
czm_material czm_getMaterial(czm_materialInput materialInput)\n\
{\n\
    czm_material material = czm_getDefaultMaterial(materialInput);\n\
\n\
    vec2 st = materialInput.st;\n\
    float glow = glowPower / abs(st.t - 0.5) - (glowPower / 0.5);\n\
\n\
    vec4 fragColor;\n\
    fragColor.rgb = max(vec3(glow - 1.0 + color.rgb), color.rgb);\n\
    fragColor.a = clamp(0.0, 1.0, glow) * color.a;\n\
    fragColor = czm_gammaCorrect(fragColor);\n\
\n\
    material.emission = fragColor.rgb;\n\
    material.alpha = fragColor.a;\n\
\n\
    return material;\n\
}\n\
";
});