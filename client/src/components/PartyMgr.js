import React from 'react';
import firebase from '../Firebase';
import StatContext from '../Context';
import itemsData from '../data/items';
import statData from '../data/statsOG';


export default class Perks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: 'Demolitionist',
			newName: '',
			newParty: '',
			availChars: [],
			options: [],
		};
	}

	static contextType = StatContext;

	componentDidMount() {
		const statContext = this.context;
		console.log(statData)
		statContext[9](itemsData);
		statContext[1](statData);
		const statsRef = statContext[0];
		console.log(statContext[0]);
		const newAvailChars = [];
		const newOptions = [];
		for (const char in statData) {
			console.log(statData[char].class)
			if (statData[char].inParty === false) {
				newAvailChars.push(statData[char].class);
				newOptions.push(<option>{statData[char].class}</option>);
			}
		}
		if (newOptions.length == 0) {
			newOptions.push(<option>None</option>);
		}
		this.setState({
			selectValue: newAvailChars[0],
			availChars: newAvailChars,
			options: newOptions,
		});
		return this.state.options;
	};

	addParty(e) {
		const statContext = this.context;
		const user = firebase.auth().currentUser;
		if (this.state.selectValue && this.state.selectValue !== 'None' && this.state.newParty !== '') {
			const statContext = this.context;
			let lowerCase = this.state.selectValue.toLowerCase();
			if (lowerCase === 'red guard') {
				lowerCase = 'redGuard';
			}
			const newStats = Object.assign({}, statContext[0]);
			newStats[lowerCase].name = this.state.newName;
			newStats[lowerCase].inParty = true;
			statContext[1](newStats);
			for (const obj in statData) {
				firebase.firestore().collection(this.state.newParty).doc(obj).set(statData[obj]);
			}
			firebase.firestore().collection(this.state.newParty).doc('items').set(itemsData);
			firebase
				.firestore()
				.collection('users')
				.doc(user.uid)
				.update({ party: [this.state.newParty] });
			statContext[5](this.state.newParty);
			
			// firebase.firestore().collection(statContext[4]).doc(lowerCase).update(newStats[lowerCase]);
		}
		this.props.onclose();
	}

	render() {
		return (
			<div className='columnFlex'>
				<h2 className='modal-header'>Party Manager</h2>
				<input
					type='text'
					id='addChar-name'
					name='goldAdd'
					placeholder='Party Name'
					onChange={(e) => {
						this.setState({ newParty: e.target.value });
					}}
				/>
				<select
					name='type'
					id='shop-filter'
					onChange={(e) => {
						this.setState({...this.state, selectValue: e.target.value.toLowerCase() });
					}}
				>
					{this.state.options}
				</select>
				<input
					type='text'
					id='addChar-name'
					name='goldAdd'
					placeholder='Character Name'
					onChange={(e) => {
						this.setState({...this.state, newName: e.target.value });
					}}
				/>
				<button
					className='additem'
					onClick={() => {
						this.addParty();
					}}
					// onMouse={this.props.onclose}
				>
					Add
				</button>
			</div>
		);
	}
}
