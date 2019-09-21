/* eslint-disable no-constant-condition */
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
    async fetchUsers(ctx) {
        const startKey = '1';
        const endKey = '999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (1) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }
    //check if certifier exists
    async certifierExists(ctx, certifierId) {
        const buffer = await ctx.stub.getState(certifierId);
        return JSON.stringify((!!buffer && buffer.length > 0));
    }
    async userExists(ctx, userId) {
        const buffer = await ctx.stub.getState(userId);
        return JSON.stringify((!!buffer && buffer.length > 0));
    }
    //check if certificate exists
    async certificateExists(ctx, certificateId) {
        const buffer = await ctx.stub.getState(certificateId);
        return JSON.stringify((!!buffer && buffer.length > 0));
    }
    //creating certifer , if exists - throw error , else taking the value and write it onto the chain
    async createCertifier(ctx, certifierId,name) {
        const exists = await this.certifierExists(ctx, certifierId);
        if (exists) {
            JSON.stringify((`The certifier ${certifierId} already exists`));
        }
        const certif = {name:name,role:0};
        const out = await ctx.stub.putState(certifierId,Buffer.from(JSON.stringify(certif)));
        return JSON.stringify(out);
    }
    async createCertificate(ctx, certifierId,certificateId,employeeId,desc) {
        const exists = await this.certificateExists(ctx, certificateId);
        if (exists) {
            JSON.stringify((`The certificate ${certificateId} already exists`));
        }
        const certificate = {desc:desc,certifierId:certifierId,employeeId:employeeId,role:2,ifVerified:'Pending'};
        const out = await ctx.stub.putState(certificateId,Buffer.from(JSON.stringify(certificate)));
        return JSON.stringify(out);
    }
    async createUser(ctx, userId,name) {
        const exists = await this.userExists(ctx, userId);
        if (exists) {
            JSON.stringify((`The certificate ${userId} already exists`));
        }
        const certificate = {userId:userId,name:name,events:[]};
        const out = await ctx.stub.putState(userId,Buffer.from(JSON.stringify(certificate)));
        return JSON.stringify(out);
    }
    //reading the certifier, if doesn't exist throw error else takes the certifier id and return it
    async readCertifier(ctx, certifierId) {
        const certifAsBytes = await ctx.stub.getState(certifierId); // get the car from chaincode state
        if (!certifAsBytes || certifAsBytes.length === 0) {
            JSON.stringify((`${certifierId} does not exist`));
        }
        console.log(certifAsBytes.toString());
        return JSON.stringify(certifAsBytes.toString());
    }

    async readCertificate(ctx, certificateId) {
        const certificateAsBytes = await ctx.stub.getState(certificateId); // get the car from chaincode state
        if (!certificateAsBytes || certificateAsBytes.length === 0) {
            JSON.stringify((`${certificateId} does not exist`));
        }
        console.log(certificateAsBytes.toString());
        return JSON.stringify(certificateAsBytes.toString());
    }

    //updating the certificate with the verification status, if not verified - throw error else write verified onto the chain
    async updateCertificate(ctx, certificateId, ifVerified) {
        console.info('============= START : changeCarOwner ===========');

        const certificateAsBytes = await ctx.stub.getState(certificateId); // get the car from chaincode state
        if (!certificateAsBytes || certificateAsBytes.length === 0) {
            JSON.stringify((`${certificateId} does not exist`));
        }
        const certificate = JSON.parse(certificateAsBytes.toString());
        certificate.ifVerified = ifVerified;

        return await ctx.stub.putState(certificateId, Buffer.from(JSON.stringify(certificate)));

    }
    //deleting the certifer, if doesn't throws and error else deletes the state
    async deleteCertifier(ctx, certifierId) {
        const exists = await this.certifierExists(ctx, certifierId);
        if (!exists) {
            JSON.stringify((`The certifier ${certifierId} does not exist`));
        }
        JSON.stringify((`The certifiers ${certifierId} has been deleted`));
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
    async verifyEvent(ctx, userId,eventId) {
        const userAsBytes = await ctx.stub.getState(userId); // get the car from chaincode state
        if (!userAsBytes || userAsBytes.length === 0) {
            JSON.stringify((`${userId} does not exist`));
        }
        const user = JSON.parse(userAsBytes.toString());
        //certificate.events.add(eventId);
        if(user.events !== undefined)
        {
            user.events.push(eventId);
        }
        else{
            user.events = [eventId];
        }
        return await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
    }

    async readEvent(ctx, eventId) {
        const eventAsBytes = await ctx.stub.getState(eventId); // get the car from chaincode state
        if (!eventAsBytes || eventAsBytes.length === 0) {
            throw new Error(`${eventId} does not exist`);
        }
        console.log(eventAsBytes.toString());
        return JSON.stringify(eventAsBytes.toString());
    }


}

module.exports = CertifierContract;
