import Constants from "../Constants"
import fuzzysort from "fuzzysort"
import Vue from "vue";

function setPlayers(state, players) {
  state.players = players
}

function setUsers(state, users) {
  state.users = users
}

function setTeams(state, teams) {
  state.teams = teams
}

function setMatches(state, matches) {
  state.matches = matches
}

function setNextMatchDay(state, nextMatchDay) {
  state.nextMatchDay = nextMatchDay
}

function setLiveData(state, liveData) {
  state.liveData = liveData
}

function addPlayer(state, player) {
  if (player.id) {
    const players = Object.assign({}, state.players)
    players[player.id] = player
    state.players = players
  }
}

function addUsersPlayer(state, payload) {
  if (payload.user && payload.players) {
    const users = Object.assign({}, state.users)
    const user = Object.assign({}, users[payload.user])

    user.players = payload.players

    users[payload.user] = user
    state.users = users
    if (payload.user.id * 1 === state.self) {
      state.players = payload.players
    }
  }
}

function addMatchDay(state, payload) {
  if (payload.day && payload.data) {
    const matchDays = Object.assign({}, state.matchDays)
    matchDays[payload.day] = payload.data
    state.matchDays = matchDays
  }
}

function addUsersLineup(state, payload) {
  if (payload.user && payload.data) {
    const users = Object.assign({}, state.users)
    const user = Object.assign({}, users[payload.user])

    user.lineup = payload.data

    users[payload.user] = user
    state.users = users
  }
}

function addTransfersToUser(state, payload) {
  if (payload.user && payload.transfers) {
    const users = Object.assign({}, state.users)
    const user = Object.assign({}, users[payload.user])
    const originTransfers = user.transfers || {}
    const transfers = Object.assign(originTransfers, payload.transfers)

    const sortedKeys = Object.keys(transfers).sort((a, b) => (a > b ? -1 : 1))
    const lastTransfers = []
    for (let x = 0; x < 20; x++) {
      if (sortedKeys[x]) {
        lastTransfers.push(transfers[sortedKeys[x]])
      }
    }

    user.lastTransfers = lastTransfers
    user.transfers = transfers
    users[payload.user] = user
    state.users = users
  }
}

function addUser(state, user) {
  if (user.id) {
    const users = Object.assign({}, state.users)
    user.ts = Date.now()
    users[user.id] = user
    state.users = users
  }
}

function setBids(state, bids) {
  state.bids = bids
}

function setErrorMessage(state, errorMessage) {
  state.errorMessage = errorMessage
}

function setAuthData(state, authData) {
  state.authData = authData
}

function setLoading(state, loadingState) {
  state.loading = loadingState
}

function setFetchedGift(state, fetchedGift) {
  state.fetchedGift = fetchedGift
}

function setGiftLevel(state, giftLevel) {
  state.giftLevel = giftLevel
}

function setGiftBonus(state, giftBonus) {
  state.giftBonus = giftBonus
}

function setSelf(state, self) {
  state.self = self
}

function setSelfData(state, selfData) {
  state.selfData = selfData
}

function setLeagues(state, leagues) {
  state.leagues = leagues
}

function setLeague(state, league) {
  state.league = league
}

function resetLoading(state) {
  state.loading = false
  state.loadingMessages = []
}

function setLoadingMessages(state, messages) {
  state.loadingMessages = messages
}

function setRanking(state, ranking) {
  state.ranking = ranking
}

function addLoadingMessage(state, message) {
  state.loadingMessages.push({
    message
  })
}

function addErrorLoadingMessage(state, message) {
  state.loadingMessages.push({
    message,
    error: true
  })
}

function setOfferThreshold(state, offerThreshold) {
  localStorage.setItem(Constants.LOCALSTORAGE.OFFER_THRESHOLD, offerThreshold)
  state.offerThreshold = offerThreshold
}

function setOfferShowTooLowOffersOnly(state, offerShowTooLowOffersOnly) {
  localStorage.setItem(Constants.LOCALSTORAGE.OFFER_SHOW_TOO_LOW_OFFERS_ONLY, offerShowTooLowOffersOnly)
  state.offerShowTooLowOffersOnly = offerShowTooLowOffersOnly
}

function setGeneralPlayerCardShowAlwaysAllDetails(state, generalPlayerCardShowAlwaysAllDetails) {
  localStorage.setItem(Constants.LOCALSTORAGE.GENERAL_PLAYER_CARD_SHOW_ALWAYS_ALL_DETAILS, generalPlayerCardShowAlwaysAllDetails)
  state.generalPlayerCardShowAlwaysAllDetails = generalPlayerCardShowAlwaysAllDetails
}

function setOfferOpenPlayerNotOnMarketPanel(state, offerOpenPlayerNotOnMarketPanel) {
  localStorage.setItem(Constants.LOCALSTORAGE.OFFER_PANEL_PLAYER_NOT_ON_MARKET, offerOpenPlayerNotOnMarketPanel)
  state.offerOpenPlayerNotOnMarketPanel = offerOpenPlayerNotOnMarketPanel
}

function setOfferOpenPlayerWithoutAnyOfferPanel(state, offerOpenPlayerWithoutAnyOfferPanel) {
  localStorage.setItem(Constants.LOCALSTORAGE.OFFER_PANEL_PLAYER_WITHOUT_ANY_OFFER, offerOpenPlayerWithoutAnyOfferPanel)
  state.offerOpenPlayerWithoutAnyOfferPanel = offerOpenPlayerWithoutAnyOfferPanel
}

function setTransfermarketExpiryDateFadeEffect(state, transfermarketExpiryDateFadeEffect) {
  localStorage.setItem(Constants.LOCALSTORAGE.TRANSFER_MARKET_EXPIRY_DATE_FADE_EFFECT, transfermarketExpiryDateFadeEffect)
  state.transfermarketExpiryDateFadeEffect = transfermarketExpiryDateFadeEffect
}

function setTransfermarketExpiryDisplayType(state, transfermarketExpiryDisplayType) {
  localStorage.setItem(Constants.LOCALSTORAGE.TRANSFER_MARKET_EXPIRY_DISPLAY_TYPE, transfermarketExpiryDisplayType)
  state.transfermarketExpiryDisplayType = transfermarketExpiryDisplayType
}

function setOfferOrder(state, payload) {
  if (payload.isTemporary === true) {
    state.offerOrder.temporary = payload.order
  } else {
    state.offerOrder.init = payload.order
    localStorage.setItem(Constants.LOCALSTORAGE.OFFER_ORDER, payload.order)
  }
}

function setMarketValueComparison(state, marketValueComparisonPlayer) {
  state.marketValueComparisonPlayer = marketValueComparisonPlayer
}

function setInitialized(state, initialized) {
  state.initialized = initialized
}

function setNextThreeMatchDays(state, nextThreeMatchDays) {
  state.nextThreeMatchDays = nextThreeMatchDays
}
function setLigainsiderPlayers(state, players) {
  state.ligainsiderPlayers = players
}

function addPlayerLigainsiderId(state, playerId) {
  // eslint-disable-next-line no-control-regex
  const removeAccents = it => it.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const target = state.ligainsiderPlayers.map( player => {
    return {
      ...player, 
      normalized: removeAccents(player.name),
    }
  })

  if(state.players[playerId]){
    const player = state.players[playerId];
    let searchTerm = player.knownName ? removeAccents(player.knownName) : removeAccents(player.firstName + ' ' + player.lastName);
   
    switch(searchTerm) {
      case 'Rafal Gikiewicz':
        searchTerm = 'Rafa Gikiewicz';
        break;
      case 'Justin Isiah Che':
        searchTerm ='Justin Che';
        break;
      case 'M. Wolf':
        searchTerm ='Marius Wolf';
        break;
      case 'Derry Lionel Scherhant':
        searchTerm = 'Derry Scherhant';
        break;
      case 'Eric Maxim Choupo-Moting':
        searchTerm = 'Choupo-Moting';
        break;
    }

    const searchLigainsiderPlayers = fuzzysort.go(searchTerm, target, {key: 'normalized'});
    const bestResult = searchLigainsiderPlayers.length > 0 ? searchLigainsiderPlayers[0] : undefined;
    if(bestResult && bestResult.obj && bestResult.obj.url){
      state.players[playerId].ligainsiderId = bestResult.obj.url;
    }
  }
}


function setSelectedPlayers(state, player) {
  if (player.id) {
    if (state.selectedPlayers[player.id] !== undefined) {
      delete state.selectedPlayers[player.id];
    } else {
      Vue.set(state.selectedPlayers, player.id, player);
    }
    setSelectedPlayersMarketValueSum(state);
  }
}

function setSelectedPlayersMarketValueSum(state) {
  const players = Object.values(state.selectedPlayers);
  state.selectedPlayersMarketValueSum = players.reduce(
    (acc, obj) => acc + obj.marketValue,
    0
  );
}

function clearSelectedPlayers(state) {
  state.selectedPlayers = {};
  state.selectedPlayersMarketValueSum = 0;
}

export default {
  setInitialized,
  addPlayer,
  addUsersPlayer,
  addUsersLineup,
  addTransfersToUser,
  addMatchDay,
  addUser,
  setSelf,
  setTeams,
  setMatches,
  setNextMatchDay,
  setSelfData,
  setLeague,
  setPlayers,
  setUsers,
  setNextThreeMatchDays,
  setBids,
  setErrorMessage,
  setLoadingMessages,
  setAuthData,
  setLoading,
  setRanking,
  resetLoading,
  addLoadingMessage,
  addErrorLoadingMessage,
  setFetchedGift,
  setGiftLevel,
  setGiftBonus,
  setLiveData,
  setLeagues,
  setOfferThreshold,
  setOfferShowTooLowOffersOnly,
  setOfferOpenPlayerNotOnMarketPanel,
  setOfferOpenPlayerWithoutAnyOfferPanel,
  setGeneralPlayerCardShowAlwaysAllDetails,
  setTransfermarketExpiryDateFadeEffect,
  setTransfermarketExpiryDisplayType,
  setOfferOrder,
  setMarketValueComparison,
  setLigainsiderPlayers,
  addPlayerLigainsiderId,
  setSelectedPlayers,
  setSelectedPlayersMarketValueSum,
  clearSelectedPlayers,
}
