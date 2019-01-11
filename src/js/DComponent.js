import React, { Component } from "react";
import DCard from "./DCard.js";
import VisibilitySensor from "react-visibility-sensor";
import InfiniteScroll from 'react-infinite-scroller';

class DComponent extends Component {
	constructor() {
		super();

		this.state = {
			visible: 0,
			checkVis: false,
			showMore: false
		}

		this.renderCards = this.renderCards.bind(this);
		this.renderLoadCard = this.renderLoadCard.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	visChange(x,i) {
		this.setState({
			visible: i%10
		})
	}

	componentDidRender() {
		this.setState({
			visible: 0,
			checkVis: false
		})
	}

	loadMore() {
		this.setState({showMore: true})
	}

	renderLoadCard(count) {
		if (count > 10) {
			return (
			<div className="card">
			<div className="content">
			<div className="header__title" style={{width: '100%'}}>Still searching?</div>
			<div className="description">Try using a more specific search term, such as full name (eg. 'Om Prakash' instead of 'Om') or registration number.</div>
			<div className="description" style={{marginBottom: '10px', height: 'auto'}}>Or see <strong>{count - 10}</strong> remaining results for the current query.</div>
			<div className="btn btn--sm btn--secondary" onClick={() => this.loadMore()}>Load more</div>
			
			</div>
			</div>)
		}
		
	}

	renderCards(data, count) {
		console.log(data.length)
		return (
			data.map((e, i) => (
							<VisibilitySensor onChange={x => this.visChange(x,i)} active={this.state.checkVis} containment={document.getElementById("result-cards")}>
							<DCard data={e._source} count={count} index={i+1} />
							</VisibilitySensor>
						)))		
	}

	render() {
		let data = this.props.data;
		let count = this.props.count;
		return (
			<div>
				<div className="result-cards" id="result-cards" ref={(ref) => this.scrollParentRef = ref}>
					{this.renderCards(data.slice(0, 10), count)}
					{this.state.showMore ? (this.renderCards(data.slice(10), count)) : (this.renderLoadCard(count))}
				</div>
				<div className="scroll-container">
				{/* if count is more than 10, show 10 dots, else show as many dots as there are cards */}
				{[...Array(count > 10 ? 10 : count)].map((x, i) =>
    						<div
								className="scroll-circle"
								id={i}
								style={{backgroundColor: (i === this.state.visible ? 'grey' : 'lightgrey')}}
							/>
  						)}
				</div>
			</div>
		);
	}
}

export default DComponent;
