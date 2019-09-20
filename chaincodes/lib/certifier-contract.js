/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class CertifierContract extends Contract {

    async certifierExists(ctx, certifierId) {
        const buffer = await ctx.stub.getState(certifierId);
        return (!!buffer && buffer.length > 0);
    }

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

    async deleteCertifier(ctx, certifierId) {
        const exists = await this.certifierExists(ctx, certifierId);
        if (!exists) {
            throw new Error(`The certifier ${certifierId} does not exist`);
        }
        await ctx.stub.deleteState(certifierId);
    }

}

module.exports = CertifierContract;
