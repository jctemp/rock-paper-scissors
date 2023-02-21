mod js_functions;
use wasm_bindgen::prelude::*;

/// The selection enum represent the options players have to
/// choose from as an action. The primary goal of it is to
/// remove the need for a string-based interface. 
#[wasm_bindgen]
#[derive(Copy, Clone, Debug)]
pub enum Selection {
    Rock,
    Paper,
    Scissors,
}

impl From<Selection> for &str {
    fn from(val: Selection) -> Self {
        match val {
            Selection::Rock => "Rock",
            Selection::Paper => "Paper",
            Selection::Scissors => "Scissors",
        }
    }
}

/// Samples randomly a selection type using the JavaScript `random()`
/// function. All options have an equal probability.
#[wasm_bindgen(js_name = sampleSelection)]
pub fn sample_selection() -> Selection {
    let rand = js_functions::random();
    if rand < 0.33 {
        Selection::Rock
    } else if rand < 0.66 {
        Selection::Paper
    } else {
        Selection::Scissors
    }
}

/// Represents the different types of players that can win a game.
/// The premise for the current implementation is that a human
/// always plays against a computer.
#[wasm_bindgen]
#[derive(Copy, Clone, Debug, PartialEq, Eq)]
pub enum Role {
    Human,
    Computer,
    None,
}

/// A struct which contains the final state of a round. It is used
/// later to create a customised message for the player.
#[wasm_bindgen]
#[derive(Copy, Clone, Debug)]
pub struct Versus {
    pub player: Selection,
    pub computer: Selection,
    pub winner: Role,
}

/// Represents a round in a game. It checks the two inputs and 
/// determines based on the rules of rock-paper-scissors the winner.
#[wasm_bindgen]
pub fn round(player: Selection, computer: Selection) -> Versus {
    match (player, computer) {
        (Selection::Scissors, Selection::Rock)
        | (Selection::Rock, Selection::Paper)
        | (Selection::Paper, Selection::Scissors) => Versus {
            player,
            computer,
            winner: Role::Computer,
        },
        (Selection::Rock, Selection::Scissors)
        | (Selection::Paper, Selection::Rock)
        | (Selection::Scissors, Selection::Paper) => Versus {
            player,
            computer,
            winner: Role::Human,
        },
        _ => Versus {
            player,
            computer,
            winner: Role::None,
        },
    }
}

/// Generates based pn the Versus struct a custom message for the
/// player.
#[wasm_bindgen]
pub fn message(versus: Versus) -> String {
    let player: &str = versus.player.into();
    let computer: &str = versus.computer.into();
    if versus.winner == Role::Human {
        format!("You Win! {player} beats {computer}.")
    } else if versus.winner == Role::Computer {
        format!("You Lose! {computer} beats {player}.")
    } else {
        "No one wins. It's a draw.".to_string()
    }
}
