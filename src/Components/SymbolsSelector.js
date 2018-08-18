import React, { Component } from 'react'
import Selector from 'src/Components/Selector/Selector'

export default class SymbolPairSelector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pair: {
				fsym: props.initialPair.fsym,
				tsym: props.initialPair.tsym
			}
		};
	}

	symUpdated = (sym, selectorId) => {
		this.setState(prevState => {
			var newState;

			if (selectorId == "fsym") {
				newState = {
					...prevState,
					pair: { ...prevState.pair, fsym: sym }
				};
			} else if (selectorId == "tsym") {
				newState = {
					...prevState,
					pair: { ...prevState.pair, tsym: sym }
				};
			}
			this.props.pairSelected(newState.pair);
			return newState;
		});
		
	};

	render() {
		let {
			symbols,
			initialPair,
			selectedPair
		} = this.props;

		const fromSymbols = symbols//.filter(sym => sym != initialPair.tsym)
		const toSymbols = symbols//.filter(sym => sym != initialPair.fsym)

		return (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr"
				}}
			>
				<Selector
					options={fromSymbols}
					initialOption={initialPair.fsym}
					optionSelected={newSym => {
						this.symUpdated(newSym, "fsym");
					}}
				/>

				<Selector
					options={toSymbols}
					initialOption={initialPair.tsym}
					optionSelected={newSym => {
						this.symUpdated(newSym, "tsym");
					}}
				/>
			</div>
		);
	}
}