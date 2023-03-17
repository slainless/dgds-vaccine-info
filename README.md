Once upon a time, a simple site was created to be a place to seek for vaccination info. 
The site was dedicated for `ＤＩＧＩＤＥＳ`. However, it lacking in many areas. 
To the present, it only contains vaccination location info.

## Tech Stack

- Snowpack, v3
- Chakra UI, v1

Built as a single-page application, using `Snowpack` (which is unmaintained anymore).

Heavily dependent on context to pass state. At the time of the development, i'm unaware of jotai and zustand.

HTTP request mechanic only relying on built-in `fetch`.

Data validation using `superstruct`. There was a plan to switch to `class-validator` but my internship is over, so further development is ceased.

## State

Only 2 features implemented: location list and location detail.

The implementation is honestly too crude and naive, mainly in how the data is described and handled. The data being fed to the UI is too concrete, making the effort in building the UI increasing exponentially. The UI should only being fed with an abstract interface, not knowing the true underlying structure of the data.

But it is a good lesson nonetheless.