$(document).ready(function() {

	//Creates face cards
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//creates suits in the deck
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//shuffles deck into a random order
	var shuffle = function(deck) { 
		var copy = [];
		var n = deck.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * deck.length);  
			if (i in deck) { 
		 		copy.push(deck[i]); 
		 		delete deck[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	deck = shuffle(deck);
	
	var cards_player_1 = [];
	var cards_player_2 = [];
	// write a function called deal that will evently divide the deck up between the two players
	var deal = function(deck) {
		for (var i = 0; i < deck.length; i++) {
			if (i % 2 === 0) {
				cards_player_1.push(deck[i]);
			} else 
			cards_player_2.push(deck[i]);
		}
	}
	deal(deck);


	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(card1, card2) {
		if (card1.number > card2.number) {
			return('Player 1 wins')
		}
		else if (card1.number < card2.number) {
			return('Player 2 wins')
		}
		else 
			return false;
	}

	var tieBreaker = function(tieComp1, tieComp2) {
		var tieBreakerPile = [];
		for (var i = j = 0; i < tieComp1.length && j < tieComp2.length; i++, j++) {			
			if (tieComp1[i] === tieComp2[j]) {
				console.log("its a tie again...")
			}
			else if (tieComp1[i].number > tieComp2[j].number) {
				tieBreakerPile.push(cards_player_1.splice(0, (i * 3)))
					console.log(i);
				tieBreakerPile.push(tieComp1.splice(0, i));
				tieBreakerPile.push(cards_player_2.splice(0, (j * 3)))
				tieBreakerPile.push(tieComp2.splice(0, j));						
				return('Player 1 wins tie breaker!')
			}
			else {
				(tieComp1[i].number > tieComp2[j].number) 
				tieBreakerPile.push(cards_player_1.splice(0, (i * 3)))
				tieBreakerPile.push(tieComp1.splice(0, i))
				tieBreakerPile.push(cards_player_2.splice(0, (j * 3)))
				tieBreakerPile.push(tieComp2.splice(0, j))			
				return('Player 2 wins tie breaker!')
			}
		}	
		return tieBreakerPile;	
	}
	


	
	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var play = function() {
		var card1 = cards_player_1.shift();
		var card2 = cards_player_2.shift();		
		var tiePile = [];			
		var result = war(card1, card2);
		if (result === 'Player 1 wins') {
			cards_player_1.push(card1, card2);
		}
		else if (result === 'Player 2 wins') {
			cards_player_2.push(card1, card2);
		}
		else {
			cards_player_1.push(card1);
			cards_player_2.push(card2);
			var tiePile = cards_player_1.splice(0, 3).concat(cards_player_2.splice(0, 3));
			var tieCard1 = cards_player_1.shift()
			var tieCard2 = cards_player_2.shift()
			var tieComp1 = [];
			var tieComp2 = [];
			for (var i = 0; i > cards_player_1.length; i++) {
				if (i % 4 === 0) {
					tieComp1.push();
				}
			}
			for (var i = 0; i > cards_player_2.length; i++) {
				if (i % 4 === 0) {
					tieComp2.push();
				}
			}
			var tieResult = tieBreaker(tieComp1, tieComp2);
			if (tieResult = 'Player 1 wins tie breaker!') {
				cards_player_1 = cards_player_1.concat(tieBreaker);
				cards_player_1.push(tieComp1, tieCard1, tieCard2);
			}
			else if (tieResult = 'Player 2 wins tie breaker!') {
				cards_player_2 = cards_player_2.concat(tieBreaker);
				cards_player_1.push(tieComp1, tieCard1, tieCard2);
			}
		}
			// else {
			// 	cards_player_1.push(card1);
			// 	cards_player_2.push(card2);
			// 	var tieCards = cards_player_1.splice(0, 3).concat(cards_player_2.splice(0, 3));
			// 	var tieCard1 = cards_player_1.shift()
			// 	var tieCard2 = cards_player_2.shift()
			// 	var tieResult = war(tieCard1, tieCard2);
			// 		if (tieResult === 'Player 1 wins') {
			// 			cards_player_1 = cards_player_1.concat(tieCards, tieCard1, tieCard2)
			// 		}
			// 		else if (tieResult === 'Player 2 wins') {
			// 			cards_player_2 = cards_player_2.concat(tieCards, tieCard1, tieCard2);
			// 		}
			// 		else {
			// 			cards_player_1.push(tieCard1);
			// 			cards_player_2.push(tieCard2);
			// 			var crazyTieCards = cards_player_1.splice(0, 3).concat(cards_player_2.splice(0, 3));
			// 			var carzyTieCard1 = cards_player_1.shift()
			// 			var crazyTieCard2 = cards_player_2.shift()
			// 			var crazyTieResult = war(crazyTieCard1, crazyTieCard2);
			// 				if (tieResult === 'Player 1 wins') {
			// 					cards_player_1 = cards_player_1.concat(crazyTieCards, crazyTieCard1, crazyTieCard2, tieCards)
			// 				}
			// 				else if (tieResult === 'Player 2 wins') {
			// 					cards_player_2 = cards_player_2.concat(tieCards, tieCard1, tieCard2);
			// 				}
			// 				else {					
			// 					alert("Three ties? You broke me!!")
			// 				}
			// 		}
			// }




		//this function (defined below) will continue to the next turn
		advance();
	}
	

	advance();
	
	$(".btn").click(function() {
		play();
	});
});
