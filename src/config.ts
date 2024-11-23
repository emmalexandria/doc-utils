export class ConfigDefault<C> {
  user?: Partial<C>
  default: C

  constructor(defaultConfig: C, user?: Partial<C>) {
    this.user = user;
    this.default = defaultConfig;
  }

  get(): C {
    return { ...this.default, ...this.user }
  }
}



