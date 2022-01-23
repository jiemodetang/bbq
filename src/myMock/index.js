/*
 * @Author: your name
 * @Date: 2022-01-17 16:15:43
 * @LastEditTime: 2022-01-20 19:01:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /openSeaClone-master/mock/index.js
 */
/*
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *                               神兽保佑            永无BUG
 */
 import userJson from './users.json'
 import getAllCollectionsList from './getAllCollectionsList.json'
 import detail from './detail.json'

 import detgetMyCollectionsail from './getMyCollections.json'
 import getAllColType from './getAllColType.json'

export const   dealMock = (mock)=> {
    mock.onPost("/api/v1/cqc/web/collection/getAllCollections").reply(200, {
      ...getAllCollectionsList
    });
    mock.onPost("/api/v1/cqc/web/collection/detail").reply(200, {
      ...detail
    });
    mock.onPost("/api/v1/cqc/web/collection/getMyCollections").reply(200, {
       ...detgetMyCollectionsail
    });
    
    mock.onGet("/api/v1/cqc/portal/sysDict/getAllColType").reply(200, {
     ...getAllColType
    });
    // mock.onGet("/api/v1/cqc/web/collection/getAllCollections").reply(200, {
    //     users: [userJson],
    // });
    // mock.onGet("/api/v1/cqc/web/collection/getAllCollections").reply(200, {
    //     users: [userJson],
    // });
};

