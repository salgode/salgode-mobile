export { getAuthHeader, getBaseHeaders, getDefaultHeaders } from './headers'

export const urls = {
  driver: {
    reservations: {
      get: {
        all: id => `/driver/trips/${id}/reservations`,
      },
      post: {
        accept: (tripId, resId) =>
          `/driver/trips/${tripId}/reservations/${resId}/accept`,
        decline: (tripId, resId) =>
          `/driver/trips/${tripId}/reservations/${resId}/decline`,
      },
    },
    single: {
      post: {
        report: id => `/driver/${id}/report`,
      },
    },
    trips: {
      get: {
        all: () => '/driver/trips',
        manifest: id => `/driver/trips/${id}/manifest`,
        single: id => `/driver/trips/${id}`,
      },
      post: {
        trip: () => '/driver/trips',
        complete: id => `/driver/trips/${id}/journey/complete`,
        start: id => `/driver/trips/${id}/journey/start`,
        next: id => `/driver/trips/${id}/journey/next`,
        arrived: id => `/driver/trips/${id}/journey/next/arrived`,
      },
      put: {
        cancel: id => `/driver/trips/${id}/cancel`,
      },
    },
  },
  passenger: {
    reservations: {
      get: {
        all: () => '/passenger/reservations',
        single: id => `/passenger/reservations/${id}`,
      },
      post: {
        send: () => '/passenger/reservations',
        cancel: id => `/passenger/reservations/${id}/cancel`,
      },
    },
    trips: {
      get: {
        all: () => '/passenger/trips',
      },
      post: {
        checkin: id => `/passenger/trips/${id}/checkin`,
        checkout: id => `/passenger/trips/${id}/checkout`,
      },
    },
  },
  places: {
    get: {
      all: () => '/places',
      location: location => `/places/${location}`,
      // TODO: Actualizar URL Encode: `/places?search=${location}`
    },
  },
  session: {
    post: {
      register: () => '/signup',
      signin: () => '/signin',
      signout: () => '/signout',
    },
  },
  trips: {
    open: {
      get: {
        all: () => '/trips/open',
      },
    },
  },
  user: {
    images: {
      post: {
        getLink: () => '/upload/image',
      },
    },
    info: {
      get: {
        own_profile: () => '/user',
        profile: id => `/users/${id}`,
      },
      put: {
        edit: () => '/user',
      },
    },
    trips: {
      get: {
        all: () => '/user/trips',
        current: () => '/user/trips/current',
      },
    },
    vehicles: {
      get: {
        all: () => '/user/vehicles',
        single: id => `/user/vehicles/${id}`,
      },
      post: {
        create: () => '/user/vehicles',
      },
      put: {
        edit: id => `/user/vehicles/${id}`,
      },
      delete: {
        single: id => `/user/vehicles/${id}`,
      },
    },
  },
}
