import { ClientFactory } from "../clientFactory/ClientFactory";
import { Context } from "../context/context"
import { PostProcess } from "./PostProcess";
import { Input } from "./Input";

export class ElasticInput implements Input {
    client: any
    searchObj: any
    context: Context
    name: string
    type: string
    postProcesses: PostProcess[]

    constructor(searchObj: any, context: Context, name: string) {
        this.type = 'elastic'
        this.client = ClientFactory.createClient('elastic')
        this.searchObj = searchObj
        this.context = context
        this.name = name
        this.postProcesses = []
    }

    execute() {
        //this.context.
        return new Promise(async (resolve, reject) => {
            try {
                this.context.set('inputs.' + this.name, {

                })
                let response = await this.client.search({
                    "body": this.searchObj
                })
                // console.log('resp', response)
                this.context.set('inputs.' + this.name + '.response', response)
                console.log('response set')
                resolve()
            } catch (err) {
                console.log('err', err)
                this.context.set('inputs.' + this.name + '.error', err)
                reject(err)
            }
        })

    }

    postProcess() {
        return new Promise(async (resolve, reject) => {
            for (let postProcess of this.postProcesses) {
                postProcess.execute()
                resolve()
            }
        })
    }

    addPostProcess(postProcess: PostProcess) {
        this.postProcesses.push(postProcess)
    }

}