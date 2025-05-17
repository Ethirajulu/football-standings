export interface League {
  id: string;
  name: string;
  logo: string;
  _links: {
    self: {
      href: string;
    };
    teams: {
      href: string;
    };
  };
}
