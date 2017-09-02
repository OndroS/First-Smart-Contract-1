pragma solidity ^0.4.13;

contract Accounts { //definovanie contractu, podobné ako definovanie class v javascripte
  //v tejto sekcii si definujeme premenné
  Account[] public account; //definovali sme si array s kľúčovým slovom "public" ktoré zabezpečí že premenná
  //je volateľná aj mimo contactu... ak by sme zadali kľúčové slovo "private", premenná by bola uzavretá len v rámci smart contractu

  struct Account { //tu sme si definovali objekt
    bytes32 firstName; //ku každému property objektu sme si definovali aj dátový typ
    bytes32 lastName; //čiže byte32 ukladá len znaky spolu dlhé max 32 bytov.
    uint age; //ukladá dátový typ integer
  }

  function addAccount(bytes32 _firstName, bytes32 _lastName, uint _age) returns (bool success) {
    //definovaná funkcia so vstupmi s definovanými dátovými typmi
    Account memory newAccount; //dáta označené "memory" odkazujú Ethereum Virtual Machine na
    //uloženie v dočasnom úložisku ktoré sa vymaže medzi externými volaniami funkcíí a hlavne je lacnejšie na použitý Gas

    newAccount.firstName = _firstName; //vstupy funkcie ukladáme do jednotlivých property objektu
    newAccount.lastName = _lastName;
    newAccount.age = _age;

    account.push(newAccount); //funckia push nám vloží objekt do array-u
    return true; //vráti nám hodnotu ktorú sme si definovali hore pri "returns"
  }

  function getAccounts() constant returns (bytes32[], bytes32[], uint[]) {
    //funkcia s definovanými výstupmi
    uint length = account.length;

    bytes32[] memory firstNames = new bytes32[](length); //predpripravené premenné do ktorých nasledujúci cyklus for bude vkladať dáta
    bytes32[] memory lastNames = new bytes32[](length);
    uint[] memory ages = new uint[](length);

    for (uint i = 0; i < account.length; i++) {
      //cyklus for prechádza Account z memory EVM, vkladá ich do nových premenných
      //aktuálneho objektu a vracia ich podľa hore definovaných výstupov
      Account memory currentAccount;
      currentAccount = account[i];

      firstNames[i] = currentAccount.firstName;
      lastNames[i] = currentAccount.lastName;
      ages[i] = currentAccount.age;

    }
    return (firstNames, lastNames, ages);
  }

}
