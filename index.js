if(typeof web3 !== 'undefined'){
  web3 = new Web3(web3.currentProvider);
}

else{
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var Contract = web3.eth.contract([{  "constant": false,  "inputs": [    {      "name": "candidate",      "type": "uint256"    }  ],  "name": "totalVotesFor",  "outputs": [    {      "name": "",      "type": "uint256"    }  ],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"},{  "constant": false,  "inputs": [    {      "name": "candidate",      "type": "uint256"    }  ],  "name": "validCandidate",  "outputs": [    {      "name": "",      "type": "bool"    }],"payable":false,  "stateMutability": "nonpayable",  "type": "function"},{  "constant": false,  "inputs": [    {      "name": "candidate",      "type": "uint256"    }  ],  "name": "voteForCandidate",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"},{  "inputs": [    {      "name": "candidateNames",      "type": "uint256[]"    }  ],  "payable": false,  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "candidateList",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "votesReceived",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}
]);

var MyContract = Contract.at('0x6ae8fc9437fa8224a9851e687a1e7bda4f0eb65e');
console.log(MyContract);

MyContract([1,2,3,4]);

candidates = {"Afrida": "candidate-1", "Nakhla": "candidate-2", "Zahin": "candidate-3", "Sadman": "candidate-4"};

function voteForCandidate() {
  candidateName = $("#candidate").val();
  MyContract.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {

    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 1; i <= 4; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(i).toString();
    $("#" + candidates[name]).html(val);
  }
});
