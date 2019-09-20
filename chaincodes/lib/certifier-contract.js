'use strict';

const { Contract } = require('fabric-contract-api');

class CertifierContract extends Contract {
//genesis block
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const events = [];
        for (let i = 0; i < eventId.length; i++) {
            events[i].docType = 'event';
            await ctx.stub.putState('event' + i, Buffer.from(JSON.stringify(events[i])));
            console.info('Added <--> ', events[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
//check if certifier exists
    async certifierExists(ctx, certifierId) {
        const buffer = await ctx.stub.getState(certifierId);
        return (!!buffer && buffer.length > 0);
    }
//creating certifer , if exissts - throw error 
    async createCertifier(ctx, certifierId, value) {
        const exists = await this.certifierExists(ctx, certifierId);
        if (exists) {
            throw new Error(`The certifier ${certifierId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(certifierId, buffer);
    }

    async readCertifier(ctx, certifierId) {
        const exists = await this.certifierExists(ctx, certifierId);
        if (!exists) {
            throw new Error(`The certifier ${certifierId} does not exist`);
        }
        const buffer = await ctx.stub.getState(certifierId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateCertifier(ctx, certifierId, newValue) {
        const exists = await this.certifierExists(ctx, certifierId);
        if (!exists) {
            throw new Error(`The certifier ${certifierId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(certifierId, buffer);
    }

    async updateCertificate(ctx, employeeId, certifierId, ifVerified) {
        if (!ifVerified) {
            throw new Error(`The certificate for ${employeeId} could not be verified`);
        }
        const asset = JSON.parse(buffer.toString());
        await ctx.stub.putState(certifierId,buffer);
        return buffer = ctx.stub.getState(ifVerified);

    }
    async deleteCertifier(ctx, certifierId) {
        const exists = await this.certifierExists(ctx, certifierId);
        if (!exists) {
            throw new Error(`The certifier ${certifierId} does not exist`);
        }
        await ctx.stub.deleteState(certifierId);
    }
    async addEvent(ctx, eventName, id, expertise) {
        console.info('============= START : Create event ===========');

        const car = {
            eventName,
            docType: 'event',
            id,
            expertise,
        };

        await ctx.stub.putState(eventName, Buffer.from(JSON.stringify(event)));
        console.info('============= END : Create event ===========');
    }


}

module.exports = CertifierContract;
