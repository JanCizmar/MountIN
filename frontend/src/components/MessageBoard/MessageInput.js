"use strict";

class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        //mocked tourId and userId
        let message = {
            tourId: 1111,
            creator: '971nidn81',
            data: this.state.message
        };
        this.props.onMessageSubmit(message);
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    render() {
        return (
            <div className={this.props.className}>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="messageBoardInput">
                        <FormControl
                            type="text"
                            value={this.state.message}
                            placeholder="Enter your message"
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <Button id="submit" type="submit"
                            disabled={this.state.message === ''}
                    >Submit</Button>
                </form>
            </div>
        );
    }
}