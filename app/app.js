'use strict';

angular.module('ethExplorer', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            }).
            when('/block/:blockId', {
                templateUrl: 'views/blockInfos.html',
                controller: 'blockInfosCtrl'
            }).
            when('/transaction/:transactionId', {
                templateUrl: 'views/transactionInfos.html',
                controller: 'transactionInfosCtrl'
            }).
            when('/address/:addressId', {
                templateUrl: 'views/addressInfo.html',
                controller: 'addressInfoCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }])
    .run(function($rootScope) {
        var web3 = new Web3();
        var eth_node_url = 'https://rpc.rengxie.com'; // TODO: remote URL
        web3.setProvider(new web3.providers.HttpProvider(eth_node_url));
        $rootScope.web3 = web3;
        function sleepFor( sleepDuration ){
            var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
        }
        var connected = false;
        if(!web3.isConnected()) {
            $('#connectwarning').modal({keyboard:false,backdrop:'static'})
            $('#connectwarning').modal('show')
        }
$rootScope.addNewChain = function() {
                        const network = {
                                chainId: '0x132e5', // 替换成新链的chainId
                                chainName: 'Universal Request for Comments', // 替换成新链的名称
                                nativeCurrency: {
                                        name: 'Universal Coin Market', // 替换成新链的代币名称
                                        symbol: 'UCM', // 替换成新链的代币符号
                                        decimals: 18 // 替换成新链的代币精度
                                },
                                rpcUrls: ['https://rpc.rengxie.com'], // 替换成新链的RPC节点地址
                                blockExplorerUrls: ['https://www.rengxie.com/'], // 替换成新链的区块浏览器地址
                        }

                        if (typeof window.ethereum !== 'undefined') {
                                window.ethereum.request({ method: 'wallet_addEthereumChain', params: [network] })
                                        .then(() => console.log('New chain added!'))
                                        .catch((error) => console.error(error))
                        } else {
                                console.error('MetaMask not found')
                        }
                }
    });
