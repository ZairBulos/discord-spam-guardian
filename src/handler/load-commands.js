const { loadFiles } = require('../utils/file-loader');

const loadCommands = (client) => {
  const commands = loadFiles('commands', true);

  commands.forEach(({ path, module }) => {
    if ('data' in module && 'execute' in module) {
      client.commands.set(module.data.name, module);
    } else {
      console.log(`[WARNING] The command at ${path} is missing a required "data" or "execute" property.`);
    }
  });
};

module.exports = { loadCommands };