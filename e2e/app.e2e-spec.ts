import { VenkatPage } from './app.po';

describe('venkat App', function() {
  let page: VenkatPage;

  beforeEach(() => {
    page = new VenkatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
