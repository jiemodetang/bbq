
import $web3js from "../../lib/contract/web3";
import numberUtils from "../../utils/numberUtils";
import { formartadd, removeLocalStorage, setLocalStorage, getLocalStorage, div } from "../../utils/index";
const creatOrderJson = require("../../lib/contract/creatOrder.json");
const nftContract = require("../../lib/contract/contractAddress");
const sellJson = require("../../lib/contract/sell.json");


function handlerSell() {
    const nftContractSellAdd = nftContract.default.test.sellContract;
    const nftContractAdd = nftContract.default.test.nftContract;
    const myaddress = getLocalStorage("walletaccount");
    const thisWeb3 = $web3js.getWeb3();
    const nftConst = new thisWeb3.eth.Contract(
        creatOrderJson.abi,
        nftContractAdd,
        {
            from: myaddress,
        }
    );
    nftConst.methods
        .isApprovedForAll(myaddress, nftContractSellAdd)
        .call({ from: myaddress })
        .then((res) => {
            if (!res) {
                approveNft();
            }
        });
}

function approveNft() {
    let getedHash = '';
    const nftContractAdd = nftContract.default.test.nftContract;
    const nftContractSellAdd = nftContract.default.test.sellContract;
    connectMetaMask();
    const web3GetWeb3 = $web3js.getWeb3();
    const myaddress = getLocalStorage("walletaccount");
    const approveConst = new web3GetWeb3.eth.Contract(
        creatOrderJson.abi,
        nftContractAdd,
        {
            from: myaddress,
        }
    );
    console.log('approveConst.methods', approveConst.methods);
    approveConst.methods
        .setApprovalForAll(nftContractSellAdd, true)
        .send({ from: myaddress })
        .on("transactionHash", function (hash) {
            getedHash = hash;
        })
        .on("receipt", function (receipt) {
            if (receipt.transactionHash == getedHash) {
            }
        })
        .on("error", function (error, receipt) {
        });
}

function connectMetaMask() {
    $web3js
        .connectMetaMask()
        .then((res) => {
            // this.$toast(this.$t("lang.connectsuc"));
        })
        .catch((error) => {
            //    this.$toast(this.$t("lang.connectfail") + error);
        });
}


function handlerBuyUseBnb() {
    let tradeHash = '';
    const nftContractSellAdd = nftContract.default.test.sellContract;
    const web3GetWeb3 = $web3js.getWeb3();
    const myaddress = getLocalStorage("walletaccount");
    const tradeWeb3 = $web3js.getWeb3();
    connectMetaMask();
    const tradeConst = new tradeWeb3.eth.Contract(
        sellJson.abi,
        nftContractSellAdd,
        {
            from: myaddress,
        }
    );
    //  tokenid ---- 后台返回
    let tokenId = 12345;
    // sellAddress ---- 后台返回卖家地址
    let sellAddress = '0x25Ba0564f4F64E6c529F2Ad05A15698a710F0aF9';
    // contractAddFromEnd ---- 后台返回的合约地址
    let contractAddFromEnd = '0x1CE4d44eA0668B7f38A7759FE8d4dE68B5431273';
    let value = numberUtils.movePointRight(0.001, 18);
    tradeConst.methods
        .callTransferFrom(contractAddFromEnd, sellAddress, tokenId)
        .send({ from: myaddress, value: value })
        .on("transactionHash", function (hash) {
            console.log('tradehash', hash);
            tradeHash = hash;
        })
        .on("receipt", function (receipt) {
            if (receipt.transactionHash == tradeHash) {
                console.log('trade' + 'success');
            }
        })
        .on("error", function (error, receipt) {
            console.log('tradeerr', error);
        });
}


return (
    <div>
        <Button style={{ height: '400px' }}
            onClick={handlerSell}
        >出售挂单</Button>
        <Button style={{ height: '200px' }}
            onClick={handlerBuyUseBnb}
        >购买/bug</Button>
    </div>
);
}

const mapStateToProps = ({ linkReducer }) => {
    return {
        colTyple: linkReducer.colTyple,
    };
};

export default connect(mapStateToProps)(Home);
