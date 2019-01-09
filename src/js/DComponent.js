import React, { Component } from "react";
import DCard from "./DCard.js";
import VisibilitySensor from "react-visibility-sensor";
import InfiniteScroll from 'react-infinite-scroller';

class DComponent extends Component {
	constructor() {
		super();

		this.state = {
			visible: null,
			showMore: false
		}

		this.renderCards = this.renderCards.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	visChange(x,i) {
		this.setState({
			visible: i%10
		})
	}

	componentDidRender() {
		this.setState({
			visible: null
		})
	}

	loadMore(data) {
		this.setState({showMore: true})
	}

	renderCards(data, count) {
		return (
			data.map((e, i) => (
							<VisibilitySensor onChange={x => this.visChange(x,i)} containment={document.getElementById("result-cards")}>
							<DCard data={e._source} count={count} />
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
					{this.state.showMore ? (this.renderCards(data.slice(10), count)) : (<div className="card" onClick={() => this.loadMore(data, count)}>Load more</div>)}
				</div>
				<div className="scroll-container">
				{[...Array(10)].map((x, i) =>
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
