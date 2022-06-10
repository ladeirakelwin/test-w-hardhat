const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('CryptoToken', function () {
	it('Should have the correct supply', async function () {
		const [owner] = await ethers.getSigners();

		const CriptoToken = await ethers.getContractFactory('CryptoToken');
		const criptoToken = await CriptoToken.deploy(100);
		await criptoToken.deployed();

		expect(await criptoToken.totalSupply()).to.equal(100);
	});
	it('The owner of the contract should have the token balance', async function () {
		const [owner, ...rest] = await ethers.getSigners();

		const CriptoToken = await ethers.getContractFactory('CryptoToken');
		const criptoToken = await CriptoToken.deploy(50);
		await criptoToken.deployed();

		expect(await criptoToken.balanceOf(owner.address)).to.equal(50);
	});

	it('Owner balance should change with each transfer', async function () {
		const [owner, receiverOne, receiverTwo, receiverThree] = await ethers.getSigners();

		const CriptoToken = await ethers.getContractFactory('CryptoToken');
		const criptoToken = await CriptoToken.deploy(75);
		await criptoToken.deployed();

		await criptoToken.transfer(receiverOne.address, 15);

		expect(await criptoToken.balanceOf(owner.address)).to.equal(60);
		expect(await criptoToken.balanceOf(receiverOne.address)).to.equal(15);

		await criptoToken.transfer(receiverTwo.address, 15);

		expect(await criptoToken.balanceOf(owner.address)).to.equal(45);
		expect(await criptoToken.balanceOf(receiverTwo.address)).to.equal(15);

		await criptoToken.transfer(receiverThree.address, 15);

		expect(await criptoToken.balanceOf(owner.address)).to.equal(30);
		expect(await criptoToken.balanceOf(receiverThree.address)).to.equal(15);
	});
});
