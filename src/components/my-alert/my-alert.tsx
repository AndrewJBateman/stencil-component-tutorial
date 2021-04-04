import { Component, h, Prop, State, Event, EventEmitter, Listen } from '@stencil/core';

export interface AcknowledgeEvent {
  when: Date;
}

@Component({
  tag: 'my-alert',
  styleUrl: 'my-alert.css',
  scoped: true,
})
export class MyAlert {
  @Prop() text: string = 'Important Alert';
  @Prop() kind: 'info' | 'success' | 'error' = 'info';
  @State() acknowledged: boolean = false;
  @Event() acknowledge: EventEmitter<AcknowledgeEvent>;

  componentDidLoad() {
    console.log("Fully loaded");
  }

  componentDidUpdate() {
    console.log("Component updated");
  }

  @Listen("click")
  handleClick() {
    this.acknowledged = true;
    this.acknowledge.emit({
      when: new Date()
    });
  }

  getCSSClass = () => this.kind + (this.acknowledged ? " acknowledged" : "");

  render() {
    return (
      <p class={this.getCSSClass()}>
        {this.text}
        <span>Acknowledge</span>
      </p>
    )
  }
}
