import React, { Component } from "react";
import DCard from "./DCard.js";
import VisibilitySensor from "react-visibility-sensor";
import InfiniteScroll from 'react-infinite-scroller';

class DComponent extends Component {
	constructor() {
		super();

		this.state = {
			visible: null
		}

		this.loadFunc = this.loadFunc.bind(this);
	}

	visChange(x,i) {
		this.setState({
			visible: i
		})
		console.log(x,i)
	}

	componentDidRender() {
		this.setState({
			visible: null
		})
	}

	loadFunc() {
		console.log("triggered")
	}

	render() {
		let data = this.props.data.slice(0, 10);
		let count = this.props.count;
		return (
			<div>
				<div className="result-cards" id="result-cards" ref={(ref) => this.scrollParentRef = ref}>
				<InfiniteScroll
		            pageStart={0}
		            loadMore={this.loadFunc}
		            hasMore={true}
		            loader={<div className="loader" key={0}>Loading ...</div>}
		            useWindow={false}
		            getScrollParent={() => this.scrollParentRef}
		        >
					{data.length > 0 &&
						data.map((e, i) => (
							<VisibilitySensor onChange={x => this.visChange(x,i)} containment={document.getElementById("result-cards")}>
							<DCard data={e._source} count={count} />
							</VisibilitySensor>
						))}
				</InfiniteScroll>
				</div>

				<div className="scroll-container">
					{data &&
						data.map((e, i) => (
							<div
								className="scroll-circle"
								id={i}
								style={{backgroundColor: (i === this.state.visible ? 'grey' : 'lightgrey')}}
							/>
						))}
				</div>
			</div>
		);
	}
}

export default DComponent;
