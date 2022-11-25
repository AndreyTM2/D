const { MessageAttachment } = require("discord.js")

module.exports = {
    Options: async (client, message, args, user) => {
        const valor = new Number(args[0])
        let options = {
            transaction_amount : valor,
            payment_method_id : "pix",
            payer : {email: "PagamentViaPix@qrcode.net"},
            description : 'ID: (' + user.user.id + ') NOME: (' + user.user.username + ')',
        }
        return options
    },
    GetImage: async (Data) => {
        const QrCode64 = Data.data.point_of_interaction.transaction_data.qr_code_base64;
        const imageStream = await new Buffer.from(QrCode64,'base64');
        const image = new MessageAttachment(imageStream, "pix.png");
        return image
    },
    GetCopyAndPaste: async (Data) => {
        const txt = Data.data.point_of_interaction.transaction_data.qr_code;
        return txt
    },
    Delete: async (client, message, args) => {
        let options = {"status": "cancelled"}
        return options
    }
}

