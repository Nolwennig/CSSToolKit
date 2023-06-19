async function detectCSSDuplicatesFromURL(fileURL) {
  try {
    const response = await fetch(fileURL);
    const cssCode = await response.text();
    detectCSSDuplicates(cssCode);
  } catch (error) {
    console.error('Erreur lors de la récupération du fichier CSS:', error);
  }
}
function detectCSSDuplicates(cssCode) {
  const declarationsRegex = /{([^}]*)}/g;
  const propertiesRegex = /[^:]+(?=:[^;]+;)/g;

  const declarations = cssCode.match(declarationsRegex);

  if (!declarations) {
    console.log('Aucune déclaration CSS trouvée.');
    return;
  }

  const duplicates = {};

  declarations.forEach((declaration) => {
    const properties = declaration.match(propertiesRegex);

    if (properties) {
      const key = properties.sort().join(';');
      duplicates[key] = duplicates[key] || 0;
      duplicates[key]++;
    }
  });

  for (const key in duplicates) {
    if (duplicates[key] > 1) {
      console.log(`Duplication détectée (${duplicates[key]} occurrences):`);
      console.log(key);
      console.log('---');
    }
  }

  console.log('Terminé.');
}
