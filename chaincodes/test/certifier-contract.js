/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { CertifierContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('CertifierContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new CertifierContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"certifier 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"certifier 1002 value"}'));
    });

    describe('#certifierExists', () => {

        it('should return true for a certifier', async () => {
            await contract.certifierExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a certifier that does not exist', async () => {
            await contract.certifierExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createCertifier', () => {

        it('should create a certifier', async () => {
            await contract.createCertifier(ctx, '1003', 'certifier 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"certifier 1003 value"}'));
        });

        it('should throw an error for a certifier that already exists', async () => {
            await contract.createCertifier(ctx, '1001', 'myvalue').should.be.rejectedWith(/The certifier 1001 already exists/);
        });

    });

    describe('#readCertifier', () => {

        it('should return a certifier', async () => {
            await contract.readCertifier(ctx, '1001').should.eventually.deep.equal({ value: 'certifier 1001 value' });
        });

        it('should throw an error for a certifier that does not exist', async () => {
            await contract.readCertifier(ctx, '1003').should.be.rejectedWith(/The certifier 1003 does not exist/);
        });

    });

    describe('#updateCertifier', () => {

        it('should update a certifier', async () => {
            await contract.updateCertifier(ctx, '1001', 'certifier 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"certifier 1001 new value"}'));
        });

        it('should throw an error for a certifier that does not exist', async () => {
            await contract.updateCertifier(ctx, '1003', 'certifier 1003 new value').should.be.rejectedWith(/The certifier 1003 does not exist/);
        });

    });

    describe('#deleteCertifier', () => {

        it('should delete a certifier', async () => {
            await contract.deleteCertifier(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a certifier that does not exist', async () => {
            await contract.deleteCertifier(ctx, '1003').should.be.rejectedWith(/The certifier 1003 does not exist/);
        });

    });

});