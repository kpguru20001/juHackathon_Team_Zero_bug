// role - 0 : certifier , 1 : employee, 2 : certificate, 3 : event
'use strict';

const { Contract } = require('fabric-contract-api');

class CertifierContract extends Contract {
//genesis block
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const events = [];
        for (let i = 0; i < events.length; i++) {
            events[i].docType = 'event';
            await ctx.stub.putState('event' + i, Buffer.from(JSON.stringify(events[i])));
            return('Added <--> ', events[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
        
    }
//check if certifier exists
    async certifierExists(ctx, certifierId) {
        const buffer = await ctx.stub.getState(certifierId);
        return (!!buffer && buffer.length > 0);
    }
//check if certificate exists
    async certificateExists(ctx, certificateId) {
        const buffer = await ctx.stub.getState(certificateId);
        return (!!buffer && buffer.length > 0);
    }
//creating certifer , if exists - throw error , else taking the value and write it onto the chain
    async createCertifier(ctx, certifierId,name) {
        const exists = await this.certifierExists(ctx, certifierId);
        if (exists) {
            throw new Error(`The certifier ${certifierId} already exists`);
        }
        const certif = {name:name,role:0};
        const out = await ctx.stub.putState(certifierId,Buffer.from(JSON.stringify(certif)));
        return out;
    }
    async createCertificate(ctx, certifierId,certificateId,employeeId,desc) {
        const exists = await this.certificateExists(ctx, certificateId);
        if (exists) {
            throw new Error(`The certificate ${certificateId} already exists`);
        }
        const certificate = {desc:desc,certifierId:certifierId,employeeId:employeeId,role:2,ifVerified:'Pending'};
        const out = await ctx.stub.putState(certificateId,Buffer.from(JSON.stringify(certificate)));
        return out;
    }
//reading the certifier, if doesnt exist throw erroe else takes the certifier id and return it
    async readCertifier(ctx, certifierId) {
        const certifAsBytes = await ctx.stub.getState(certifierId); // get the car from chaincode state
        if (!certifAsBytes || certifAsBytes.length === 0) {
            throw new Error(`${certifierId} does not exist`);
        }
        console.log(certifAsBytes.toString());
        return certifAsBytes.toString();
    }

    async readCertificate(ctx, certificateId) {
        const certificateAsBytes = await ctx.stub.getState(certificateId); // get the car from chaincode state
        if (!certificateAsBytes || certificateAsBytes.length === 0) {
            throw new Error(`${certificateId} does not exist`);
        }
        console.log(certificateAsBytes.toString());
        return certificateAsBytes.toString();
    }

//updating the certificate with the verification status, if not verified - throw error else wtite verified onto the chain
    async updateCertificate(ctx, certificateId, ifVerified) {
        console.info('============= START : changeCarOwner ===========');

        const certificateAsBytes = await ctx.stub.getState(certificateId); // get the car from chaincode state
        if (!certificateAsBytes || certificateAsBytes.length === 0) {
            throw new Error(`${certificateId} does not exist`);
        }
        const certificate = JSON.parse(certificateAsBytes.toString());
        certificate.ifVerified = ifVerified;

        return await ctx.stub.putState(certificateId, Buffer.from(JSON.stringify(certificate)));

    }
//deleting the certifer, if doesnt throws and error else deletes the state  
    async deleteCertifier(ctx, certifierId) {
        const exists = await this.certifierExists(ctx, certifierId);
        if (!exists) {
            throw new Error(`The certifier ${certifierId} does not exist`);
        }
        await ctx.stub.deleteState(certifierId);
    }
    async addEvent(ctx, eventId,eventName, expertise, certifierId) {
        console.info('============= START : Create event ===========');

        const event = {
            eventName:eventName,
            role:3,
            expertise:expertise,
            certifierId:certifierId
        };

        await ctx.stub.putState(eventId, Buffer.from(JSON.stringify(event)));
        console.info('============= END : Create event ===========');
    }

    async readEvent(ctx, eventId) {
        const eventAsBytes = await ctx.stub.getState(eventId); // get the car from chaincode state
        if (!eventAsBytes || eventAsBytes.length === 0) {
            throw new Error(`${eventId} does not exist`);
        }
        console.log(eventAsBytes.toString());
        return eventAsBytes.toString();
    }


}

module.exports = CertifierContract;
