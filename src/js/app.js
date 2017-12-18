App = {

  web3Provider: null,
  contracts: {},


  init: function() {
    $.getJSON('../bags.json', function(data) {
      var bagRow = $('#bagRow');
      var bags = $('#bagT');
      for (i = 0; i < data.length; i ++) {
        bags.find('.panel-title').text(data[i].name);
        bags.find('img').attr('src', data[i].picture);
        bags.find('.bag-type').text(data[i].type);
        bags.find('.bag-price').text(data[i].preis);
        bags.find('.btn-rent').attr('data-id', data[i].id);
        bags.find('.btn-rentback').attr('data-id', data[i].id);
        bagRow.append(bags.html());
      }
    });
    return App.initWeb3();
  },


  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },


  initContract: function() {
    $.getJSON('Fashion.json', function(data) {
      var LendArtifact = data;
      App.contracts.Lend = TruffleContract(LendArtifact);
      App.contracts.Lend.setProvider(App.web3Provider);
      return App.markRented();
    });
    return App.bindEvents();
  },


  bindEvents: function() {
    $(document).on('click', '.btn-rent', App.lend);
    $(document).on('click', '.btn-rentback', App.lendback);
  },


  markRented: function(adopters, account) {
    var Contract;
    App.contracts.Lend.deployed().then(function(instance) {
      Contract = instance;
      return Contract.getRenters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        $('.panel-bag').eq(i).find('button').last().text('Noch nicht verliehen').attr('disabled', true);
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-bag').eq(i).find('button').first().text('Verliehen').attr('disabled', true);
          $('.panel-bag').eq(i).find('button').last().text('Rückgabe').attr('disabled', false);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },


  lend: function() {
    event.preventDefault();
    var bagID = parseInt($(event.target).data('id'));
    var Contract;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Lend.deployed().then(function(instance) {
        Contract = instance;
        return Contract.rent(bagID, {from: account});
      }).then(function(result) {
        return App.markRented();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },
   lendback: function() {
    event.preventDefault();
    var bagID = parseInt($(event.target).data('id'));
    var Contract;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Lend.deployed().then(function(instance) {
        Contract = instance;
        return Contract.rent_back(bagID, {from: account});
      }).then(function(result) {
        return App.markRented();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }


};


$(function() {
  $(window).load(function() {
    App.init();
  });
});
