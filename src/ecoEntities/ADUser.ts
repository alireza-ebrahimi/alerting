import Neode from 'neode'

export default class ADUser {
    static model: Neode.SchemaObject = {
        objectSid: {
            type: 'string',
            unique: true,
            primary: true
        },
        email: 'string',
        cn: 'string',
        dn: 'string',
        logonName: 'string',
    }
}