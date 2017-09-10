import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //Spojenie s naším testrpc spusteným lokálne na porte 8545

var accountsContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"account","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addAccount","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAccounts","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"}]; //ABI - application binary interface
var accountsContractAddress = '0xad35970639246f196704e799952344aba5684b42'; //Adresa nášho smart contractu

var accountsContract = new ETHEREUM_CLIENT.eth.Contract(accountsContractABI, accountsContractAddress);//Vytvorí objekt pre solidity contract podľa zadaného ABI a konkrétnej adresy contractu

export default class App extends Component {
  constructor(props) { //metóda pre vytváranie a inicializovanie objektov vytvorených triedou(class)
    super(props)//umožňuje nám prístup k constuctor metóde rodičovskej triedy(parent class)
    this.state = {//objekt, definícia stavov kde si budeme ako pole(array) ukladať dáta
      firstNames: [],
      lastNames: [],
      ages: []
    }
  }

  componentDidMount() {//metóda invokovaný okamžite ako je komponenty namountovaný ?alebo rendrovaný? (niesom si istý ako to mám prekladať)
    console.log('accountsContract ', accountsContract);
    accountsContract.methods.getAccounts().call().then((result) => {//z vytvoreného objektu ako bolo popísané hore si zavoláme metódu getAccounts() z nášho SC
      this.setState({//callback funkcia nám vráti dáta z SC ktoré setujeme ako state do vytvoreného objektu v konštruktore
        firstNames: String(result[0]).split(','),
        lastNames: String(result[1]).split(','),
        ages: String(result[2]).split(',')
      })
    });
  }

  render() {

    var TableRows = []

    _.each(this.state.firstNames, (value, index) => {
      //spracujeme dáta zo statu do tabuľky pomocou lodash
      //keďže metóda getAccounts() nám vrátila dáta zahashované, pomocou metódy toAscii dáta dekódujeme
      TableRows.push(
        <tr>
          <td>{ETHEREUM_CLIENT.utils.toAscii(this.state.firstNames[index])}</td>
          <td>{ETHEREUM_CLIENT.utils.toAscii(this.state.lastNames[index])}</td>
          <td>{this.state.ages[index]}</td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Dapp</h2>
        </div>
        <div className="App-Content">
          <div className="container">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
              {TableRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
