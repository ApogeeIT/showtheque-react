import * as React from 'react';

interface ButtonProps {
  label: string;
  placeholder?: string;
  value: string,
  name: string,
  error?: string,
  //onChange: (e: React.FormEvent<{}>) => void
}


export class TextInput extends React.Component<ButtonProps, {}> {

  private wrapperClass: string;

  constructor(props?: ButtonProps, context?: any) {
    super(props, context);

    this.wrapperClass = 'form-group';


    if (this.props.error && this.props.error.length > 0) {
      this.wrapperClass += ' has-error';
    }
  }

  // wrapperClass = 'form-group';
  // let wrapperClass = 'form-group';

  onChange(e: React.FormEvent<{}>) {
    console.log(e);
    //this.setState({ value: e.target });
  }

  render() {

    return (
      <div className={this.wrapperClass}>
        {this.props.label && <label htmlFor={this.props.name}>{this.props.label}</label>}
        <div className="field">
          <input
            type="text"
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.onChange}
            />
          {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}
        </div>
      </div>
    );
  }

}
