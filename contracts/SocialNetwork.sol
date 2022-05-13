pragma solidity >=0.4.22 <0.9.0;

contract SocialNetwork{
    string public name;
    uint public postCount=0;
    mapping(uint => Post) public posts;
    struct Post{
        uint id;
        string content;
        string imgHash;
        uint tipAmount;
        address payable author;
    }
    event PostCreated(
        uint id,
        string content,
        string imgHash,
        uint tipAmount,
        address payable author
    );

    event PostTipped(
        uint id,
        string content,
        string imgHash,
        uint tipAmount,
        address payable author
    );
    constructor() public {
        name = "Social Network";
        posts[postCount]=Post(postCount,'First Post','#123',0,payable(msg.sender));
    }
    function CreatePost(string memory _content, string memory _hash) public{
        require(bytes(_content).length > 0);
        require(bytes(_hash).length > 0);
        ++postCount;
        posts[postCount] = Post(postCount,_content,_hash,0, payable(msg.sender));
        emit PostCreated(postCount, _content,_hash, 0, payable(msg.sender));
    }
    function tipPost(uint _id) public  payable{
        require(_id>0 && _id<=postCount);
        //fetch post
        Post memory _post = posts[_id];
        //fetch the author
        address payable  _author = (_post.author);
        //send ether to author
        _author.transfer(msg.value);
        //tip amount
        _post.tipAmount = _post.tipAmount + msg.value;
        //update the post
        posts[_id] = _post;
        emit PostTipped(_id, _post.content,_post.imgHash, _post.tipAmount, _author);

    }
}