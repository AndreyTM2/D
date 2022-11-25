module.exports = async(client, interaction)=> {
    const cmd = client.SlashComandos.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "Ocorreu um erro", ephemeral: true});
    
    const args = [];
    
    for (let option of interaction.options.data) 
    {  
        if (option.type === "SUB_COMMAND") { if (option.name) args.push(option.name);
            option.options?.forEach((x) => { if (x.value) args.push(x.value)})} 
        else if (option.value) args.push(option.value);
    }

   return cmd.run(client, interaction, args);
}