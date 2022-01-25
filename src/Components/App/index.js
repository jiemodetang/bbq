import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Home";
// 详情页
import Detail from "../Detail";
// 出售
import Sell from "../Sell";
import Navigation from "../Navigation";
import Item from "../Item";
// nft 类型
import assets from "../Nfts";

// 我的集合
import collections from "../MyCollection";

// 创建集合
import createCollection from "../CreateCollection";
// 底部
import Footer from "../Footer";

import Drcollection from "../Drcollection";
import CreateItem from "../CreateItem";
import {getCookie} from '../../utils/index'
import {apiConfig} from '../../service/mmp'
const NB = () => {
    return 111;
};

const App = () => {
     if(  getCookie('token')){
          apiConfig.token =   getCookie('token')
      }
    return (
        <div>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/NB" component={NB} />
                <Route exact path="/collection/detail" component={Detail} />
                <Route exact path="/home/sell" component={Sell} />
                <Route exact path="/assets/type" component={assets} />
                <Route exact path="/collection/item" component={Item} />
                <Route exact path="/collections" component={collections} />

                <Route exact path="/collection/create" component={createCollection} />
                <Route exact path="/collection/dr" component={Drcollection} />

                <Route exact path="/collection/createItem" component={CreateItem} />

                
            </Switch>
            <Footer></Footer>
        </div>
    );
};

export default App;
