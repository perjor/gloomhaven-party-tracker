import React from 'react';
import Perks from './Perks';
import Items from './Items';
import XP from './XP';
import Gold from './Gold';
import AddChar from './AddChar';
import PartyMgr from './PartyMgr';
import Unlocks from './Unlocks';
import '../style/Card.css';

export default class Modal extends React.Component {
	renderSwitch(route) {
		switch (route) {
			case 'items':
				return <Items stats={this.props.stats} route={this.props.charRoute} />;
			case 'perks':
				return <Perks stats={this.props.stats} route={this.props.charRoute} />;
			case 'xp':
				return <XP stats={this.props.stats} route={this.props.charRoute} />;
			case 'gold':
				return <Gold stats={this.props.stats} route={this.props.charRoute} />;
			case 'addChar':
				return <AddChar onclose={this.props.onclose} />;
			case 'partyMgr':
				return <PartyMgr onclose={this.props.onclose} />;
			case 'unlocks':
				return <Unlocks onclose={this.props.onclose} />;
			default:
				return <XP stats={this.props.stats} route={this.props.charRoute} />;
		}
	}
	render() {
		if (!this.props.show) {
			return null;
		}
		return (
			<div className='modal'>
				<div className='modal-dimmer'>
					<button className='modal-close' onClick={this.props.onclose}>
						&#10006;
					</button>
					{this.renderSwitch(this.props.modalRoute)}
				</div>
			</div>
		);
	}
}
