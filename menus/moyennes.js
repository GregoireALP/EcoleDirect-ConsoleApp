(async ( )=> {
    //Get user logs from previous menu
    const logs = process.argv.slice(2)
    const USERNAME = logs[0]
    const PASSWORD = logs[1]

    //Get banner
    const banner = require("../assets/ASCII")

    //Get EcoleDirect instances
    const EcoleDirect = require("node-ecole-directe")
    const EcoleDirectSession = new EcoleDirect.Session
    const EcoleDirectAccount = EcoleDirectSession.connexion(USERNAME, PASSWORD)

    //Menu instances
    const menu = require("node-menu")
    menu.customHeader(function(){process.stdout.write(banner.banner + "\n")})
    menu.customPrompt(function() { process.stdout.write("Saisir le numéro de la matière")})
    menu.addDelimiter('-', 40, 'Voir vos moyennes')

    menu.addItem(
        "Moyenne Mathématque",
        () => {
            console.log("Sale pute")
        }
    )
    menu.addItem(
        "Moyenne Français"
    )
    menu.addItem(
        "Moyenne Histoire-Géographie"
    )
    menu.addItem(
        "Moyenne Langue LV1"
    )
    menu.addItem(
        "Moyenne Langue LV2"
    )
    menu.addItem(
        "Moyenne Physique-Chimie"
    )
    menu.addItem(
        "Moyenne SVT"
    )
    menu.addItem(
        "Moyenne Technologie/SNT"
    )
    menu.addItem(
        "Moyenne Sport"
    )

    menu.addDelimiter('-', 40)
    menu.start()
})();