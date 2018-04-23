import { DoitPage } from './app.po';

describe('doit App', () => {
  let page: DoitPage;

  beforeEach(() => {
    page = new DoitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
