//Global Variables//

//Has user selected character
var heroSelected = false;

//Has user selected defender
var defenderSelected = false;

//Define characters into objects - name, hp, attack, counter-attack
var alex = {
    name: "Alex",
    hp: 180,
    attack: 5,
    attackIncrease: 5,
    counter: 25,
}

var georgie = {
    name: "Georgie Boy",
    hp: 150,
    attack: 6,
    attackIncrease: 6,
    counter: 20,
}

var pete = {
    name: "Pete",
    hp: 120,
    attack: 8,
    attackIncrease: 8,
    counter: 10,
}

var dim = {
    name: "Dim",
    hp: 100,
    attack: 10,
    attackIncrease: 10,
    counter: 5,
}

//Holds hero character
var hero = {};

//Holds chosen defender
var defender = {};

//Variable for enemies defeated
var enemiesDefeated = 0;

//Variable for game over
var gameOver = false;

//Function for creating hero values
function createHero(x) {
    hero.name = x.name
    hero.hp = x.hp
    hero.attack = x.attack
    hero.attackIncrease = x.attackIncrease
}

//Function for creating defender values
function createDefender(x) {
    defender.name = x.name
    defender.hp = x.hp
    defender.counter = x.counter
}

//Function for moving anyone that isn't hero or defender into enemies
function moveToEnemies() {
    $(".available").removeClass("available").addClass("enemy");
    $(".enemy").appendTo($("#enemies-div"));
}

//Function to reset game
function reset() {
    $(".character").removeClass("hero enemy defender").addClass("available");
    $(".available").appendTo("#available");
    $(".available").show();
    $("#restart").hide();
    $("#message").empty();
    $("#messagetwo").empty();

    //Reset Global Variables
    heroSelected = false;
    defenderSelected = false;
    enemiesDefeated = 0;
    gameOver = false;

    //Reset HP for all characters
    alex.hp = 180;
    $("#alex-hp").text("HP: " + alex.hp);
    georgie.hp = 150;
    $("#georgie-hp").text("HP: " + georgie.hp);
    pete.hp = 120;
    $("#pete-hp").text("HP: " + pete.hp);
    dim.hp = 100;
    $("#dim-hp").text("HP: " + dim.hp);

}
$(document).ready(function () {

    reset();

    //Determine what happens if user clicks Alex
    $("#alex").on("click", function () {
        if (heroSelected == false) {
            //Set user's hero object values
            createHero(alex);
            heroSelected = true;
            //Display chosen character
            $("#alex").removeClass("available").addClass("hero");
            $(this).appendTo("#hero-div");

            //Move remaining characters to enemies section
            moveToEnemies();

            //Make if statement for defender
        } else if (heroSelected == true && defenderSelected == false && gameOver == false) {
            if ($("#alex").hasClass("enemy")) {
                //Set user's defender object values
                createDefender(alex);
                defenderSelected = true;
                //Display defender
                $("#alex").removeClass("enemy").addClass("defender");
                $(this).appendTo("#defender-div");

            }
        }

    });

    //Determine what happens if user clicks Georgie
    $("#georgie").on("click", function () {
        if (heroSelected == false) {
            //Set user's hero object values
            createHero(georgie);
            heroSelected = true;
            //Display chosen character
            $("#georgie").removeClass("available").addClass("hero");
            $(this).appendTo("#hero-div");
            console.log(this);

            //Move remaining characters to enemies section
            moveToEnemies();

            //Make if statement for defender
        } else if (heroSelected == true && defenderSelected == false && gameOver == false) {
            if ($("#georgie").hasClass("enemy")) {
                //Set user's defender object values
                createDefender(georgie);
                defenderSelected = true;
                //Display defender
                $("#georgie").removeClass("enemy").addClass("defender");
                $(this).appendTo("#defender-div");

            }
        }
    });

    //Determine what happens if user clicks Pete
    $("#pete").on("click", function () {
        if (heroSelected == false) {
            //Set user's hero object values
            createHero(pete);
            heroSelected = true;
            //Display chosen character
            $("#pete").removeClass("available").addClass("hero");
            $(this).appendTo("#hero-div");

            //Move remaining characters to enemies section
            moveToEnemies();

            //Make if statement for defender
        } else if (heroSelected == true && defenderSelected == false && gameOver == false) {
            if ($("#pete").hasClass("enemy")) {
                //Set user's defender object values
                createDefender(pete);
                defenderSelected = true;
                //Display defender
                $("#pete").removeClass("enemy").addClass("defender");
                $(this).appendTo("#defender-div");

            }
        }
    });

    //Determine what happens if user clicks Dim
    $("#dim").on("click", function () {
        if (heroSelected == false) {
            //Set user's hero object values
            createHero(dim);
            heroSelected = true;
            //Display chosen character
            $("#dim").removeClass("available").addClass("hero");
            $(this).appendTo("#hero-div");

            //Move remaining characters to enemies section
            moveToEnemies();

            //Make if statement for defender
        } else if (heroSelected == true && defenderSelected == false && gameOver == false) {
            if ($("#dim").hasClass("enemy")) {
                //Set user's defender object values
                createDefender(dim);
                defenderSelected = true;
                //Display defender
                $("#dim").removeClass("enemy").addClass("defender");
                $(this).appendTo("#defender-div");

            }
        }

    });

    //Determine what happens when attack button is clicked
    $("#attack").on("click", function () {
        if (heroSelected && defenderSelected && gameOver == false) {
            //Defender counter is subtracted from hero hp
            hero.hp -= defender.counter;
            //Hero attack is subtracted from defender hp
            defender.hp -= hero.attack;
            //Display updated HP
            $(".hero").children(".hp").text("HP: " + hero.hp);
            $(".defender").children(".hp").text("HP: " + defender.hp);
            //Display messages to DOM
            $("#message").text("You attacked " + defender.name + " for " + hero.attack + " damage.");
            $("#messagetwo").text(defender.name + " attacked you back for " + defender.counter + " damage.");
            //Hero attack increased by original attack value
            hero.attack += hero.attackIncrease;
        }
        //If statement for removing defeated defender from game
        if (defender.hp <= 0 && defenderSelected && gameOver == false) {
            //Allows for new defender to be chosen
            defenderSelected = false;
            //Add 1 to enemies defeated count
            enemiesDefeated++;
            //Remove defender from gameplay
            $(".defender").hide();
            //Update DOM
            $("#message").text("You have defeated " + defender.name);
            $("#messagetwo").text("Choose another enemy to fight");
        }
        //Reset game if all enemies are defeated
        if (enemiesDefeated == 3) {
            $("#message").text(hero.name + " is the last droog standing!");
            $("#messagetwo").text("You WIN! Press restart to play again!");
            $("#restart").show();
        }

        if (hero.hp <= 0) {
            gameOver = true;
            $("#message").text("You've been kicked in the yarbles one too many times!");
            $("#messagetwo").text("Press restart to play again!");
            $("#restart").show();
        }
    });

    //Define restart button
    $("#restart").on("click", function () {
        reset();
    });

});