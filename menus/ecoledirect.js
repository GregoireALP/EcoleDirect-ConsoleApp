(async () => {
    //Interal exports
    const banner = require("../assets/ASCII")

    //Init constants with user logs
    const logs = process.argv.slice(2)
    const USERNAME = logs[0]
    const PASSWORD = logs[1]

    if(logs.length == 0) {
        return console.log("\x1b[31m","Vos identifiants sont faux ! npm start <utilisateur> <motdepasse> !","\x1b[0m")
    }

    //EcoleDirect Instances
    const EcoleDirect = require("node-ecole-directe")
    const EcoleDirectSession = new EcoleDirect.Session
    const EcoleDirectAccount = await EcoleDirectSession.connexion(USERNAME, PASSWORD);

    //Node menu
    const menu = require("node-menu")

    //Programme
    menu.customHeader(function(){process.stdout.write(banner.banner + "\n")})
    menu.addDelimiter('-', 40, 'Bonjour ' + EcoleDirectAccount.prenom + " " + EcoleDirectAccount.nom)
    menu.customPrompt(function() { process.stdout.write("Saisir le numéro de l'option souhaité")})

    menu.addItem( 
        'Voir toutes mes sanctions',
        async function() { 
            const UserSanctions = await EcoleDirectAccount.fetchVieScolaire()
            var SanctionsJSON = UserSanctions.sanctionsEncouragements
            for(var i = 0; i < SanctionsJSON.length; i++) {
                let obj = SanctionsJSON[i]

                console.log("- Sanction [" + i + "]: Fait le " + obj.date + " pour " + obj.motif + ", travail à faire: " + obj.aFaire + "\n")
            }
        }
    )

    const { spawn } = require("child_process")
    menu.addItem(
        'Voir toutes mes moyennes',
        () => {
            const cmd = spawn("node", ["./menus/moyennes.js", USERNAME, PASSWORD])

            cmd.stdout.on("data", data => {
                console.log(`${data}`);
            });

            cmd.stderr.on("data", data => {
                console.log(`${data}`);
            });

            cmd.on('error', (error) => {
                console.log(`error: ${error.message}`);
            });

            cmd.on("close", code => {
                console.log(`${code}`);
            });
        }
    )
    menu.addDelimiter('-', 40)
    menu.start()
})();
