const { assert } = require('chai');

const SocialNetwork = artifacts.require("./SocialNetwork.sol");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('SocialNetwork',([deployer,author,tipper])=>{
    let socialNetwork
    before(async()=>{
        socialNetwork = await SocialNetwork.deployed();
    })
    describe('deployment',async () =>{
        it('deploys successfuly',async () =>{            
            const address = await socialNetwork.address;
            assert.notEqual(address,0X0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
        it('Has Name',async() =>{
            const name = await socialNetwork.name()
            assert.equal(name,'Social Network')
        })
    })
    describe('Post',async () =>{
        before(async()=>{
            result = await socialNetwork.CreatePost('This is my first post',{from: author})
            postCount = await socialNetwork.postCount(); 
        })
        it('Post Created',async () =>{            
                       
            assert.equal(postCount,1)
            const event =result.logs[0].args
            assert.equal(event.content,'This is my first post','Content matches')
            assert.equal(event.tipAmount,0,'Tip matches')
            assert.equal(event.author,author,'author matches')
            assert.equal(event.id.toNumber(),postCount.toNumber(),'id matches')
            
        })
        it('list posts',async() =>{
            const post = await socialNetwork.posts(postCount)
            assert.equal(post.content,'This is my first post','Content matches')
            assert.equal(post.tipAmount,0,'Tip matches')
            assert.equal(post.author,author,'author matches')
            assert.equal(post.id.toNumber(),postCount.toNumber(),'id matches')
        })
        it('Allows user to tip posts',async() =>{
            
            result = await socialNetwork.tipPost(postCount, {from: tipper,value: web3.utils.toWei('1' , 'Ether')})            
            const event =result.logs[0].args
            assert.equal(event.content,'This is my first post','Content matches')
            assert.equal(event.tipAmount,'1000000000000000000','Tip matches')
            assert.equal(event.author,author,'author matches')
            assert.equal(event.id.toNumber(),postCount.toNumber(),'id matches')
           
        })
    })
})