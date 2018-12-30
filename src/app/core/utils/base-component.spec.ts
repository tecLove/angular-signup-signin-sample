import { BaseComponent } from './base-component';

let psc: BaseComponent;

describe('Base Component', () => {
  beforeEach(() => {
    psc = new BaseComponent();
  });
  it('should create', () => {
    psc.init();
    expect(psc).toBeTruthy();
  });

  it('should call ngDestroy method', () => {
    expect(psc.callBackFunction(null)).toEqual('');
  });
});
