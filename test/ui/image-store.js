import React, { Component } from 'react'
import {
  Alert,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  // ImageStore,
  TouchableHighlight,
} from 'react-native'

import ImageStore from 'react-native-image-store'

import SplashScreen from 'react-native-splash-screen'
if (SplashScreen && SplashScreen.hide) {
  SplashScreen.hide()
}

const IMAGE_BASE_64 = '/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gNjUK/9sAQwALCAgKCAcLCgkKDQwLDREcEhEPDxEiGRoUHCkkKyooJCcnLTJANy0wPTAnJzhMOT1DRUhJSCs2T1VORlRAR0hF/9sAQwEMDQ0RDxEhEhIhRS4nLkVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVF/8AAEQgBtgGQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9cooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooNABRTGdU+8wX6mqz6nZRnD3UQPuwpBYuUVQbWLFetynTOQeKUavaHJEwIHei47MvUVRh1W0nBKzAbeu7ip4rqGcZjlVs+hoFYnopO1LTAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKQnFUdS1a30yEvMwLdkHU0m0gSuXqQkDqcV59qXjK6md0iKxxj061l3HiGdoS4uH3dAc1LmjRU2eiajrlnpyEyzKz9kU5Jrjr/wAe3GX8gKq9B61yxupJYzuJLt3PWqUikPxzgZz71PM2aKmkbE2sXt1vlurhyxHyjPAqit0ivvkJbjuepqmpZiB14qAI7Ag/UZpXG1bY2pNXAgZRggrjNEOuTSR+Wx6Dt7VktbO8BKjHFOs43+VueDgihsEja/4SKSWE7QOuG/Orlh4mYygt8u3gBelYz6eqSBkOEkG7ikNr5BOfuN1PoaVwsdpZ+M22GJid46ZrdsPFNrchVkcK3Q54ry/7LIAGU8d6v26sqDOST3o52hciZ65HcRyn5HDcZ4NSfjXnmm6pNG1ujPgo+0n2NamteITBHavFJ8zEhgD6Vop3Rk6bTsdfS1n2N8JYlMrLllDAirkU8cwzGwYe1VdE2ZJRRRTEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUhNGaw/Emr/YLUpEw81uPcUm7IaV3Yr+IfEyaept7YhpyOvULXnuoalcXLl3lLsepNF1M08rSEnngmqjpvQAdTmsW76nRGPKV97bRzljUqLu2lugFSi227Nw6LzViGHbF83UjAoGRiMbcryQMUr2xSJ8gc1OQEjYHGeBVmRQYCp/iGM1LYzIWMI8ZbgAkH8ac8BG5QuCpx9auW8Int2Vx8wHb1FOkCsqTAnOMMPXtTuFhLSNHt2A54IxUdrEGlePGCOQD3p1gPLuZIicK3zLUgAhnDNnKkgn2ouCROqbo3VR04A9KEQSW+HG7scelJbyZMnPA+bNOjcxXWT/q5hjjsam47EEKFZTGV+7wPf0q3AuMgdzke1QXMmxw6A5U/NT7WcMGbj71K40ibIzggfM2KjktjPOhY4C5/OntKqvkjAY8fWn28gcHnIOSKEwsaVprexVgmXouA+K0tG1JI50UcIwIJJ754rmzGHVMdSAKuFDFBGI+uCPyqlMhwuehqwYAg5FOrhNH8T3Al2TD90Dtx3JrtLa4W5hV1BAPrXQmmc8otE9FJmlpkhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRSZoAQ9K868RztcXbZbcFbrXY6trEVnA4Q7pMdugrzy7ujJIzNzzWU30Nqa6lB1ALqOmRShAVwDjJyPrSO/zuT3HBpsUm5QpP4+9ZmpK53KuTz3pryYIUH7tLxxj+I81XZj5fbcp2mgZPK6hGxnOasLIDGu7uQRVAtksGOflzT4HEkYQN3+WkwL0beRO6hepph25O37mcYqO4fOJAecdu1ImJN6k4Mg3D2NIYbhHcqOnpUt03Dt2A3D3rJubiQ26vnMkR5960Zpw1oXJ9P1pgRWs2JTlshgc+3cVK84ePCnBGDWXBPtu48/7p9/SnCfbcSRkfQelDQrmtJKAyMeVlGCPeqNtdFJZomP3CMUxJN1uhDchuAaqNKRdyNjqAWFNIHoa0M/mzOjtwCTU0VwUbywcADrWLbXI+2bwcBj0qzDcfvpSTnccAUmrAmbMd0PIRyeV6VpbvM8kg4yN1crJcbbdB2I6Vft7/ADMig9FC1NirmrOPKjcQgJtJ+buas6br13ZrFB5oYZ6NVVWSZ13ZYD8qJUUg7MZHTimpNEuKZ6Na3IuIVbOTjmp815nY38tlOrSs2zuoY8121heR3turW9wyN/dY5rojO5zShymvmio0Lhf3mOO4qQVZAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVDVLyOytC8rbVJwTVx5FjQsxwAMmvN/FmvtqM/kxf8e0ZxnP3jUydioq7G3OspfyER/LEpPFY8kgG8EZHb2qtbN+8LseDwQKfOpVW9vXuKwZ0pWImfAzgkg5+tLwcOh2hqiaVRyAR9aejkZUJgMPyoAlZ8DIHSop8MdyH5XGfxpN0iZBXINKGDKV2bTng0WGQGZgofrt6+4pIpPLlBBwpORT5INq9eeuPWqvlt93PTke1NCNF5twJH3W+YUyKbkYPI6ZqCGVSAecdCPSkOVfB7H9KQxt6Sku8YCucHHY08y7rfbnrxSvH50RXv1qk25RtOeDTERFyHjfOMHB+tSXMv75ZFPze1OEG8HA680JbsW5FNtCsxyzfu8f7W4YplwSJi2eoqT7O0T8jipHtzKqgUrjsygp2YPIzmrUcu3y8E5OTSz221yvPSkjQEfMPu8UXCzHvIWEannAp8LtHI5HrS+US44z2FW47MncT+lS2UkXYbtsRKCAcc5rXhZDHgkEgc1z2BEysRk5wK3LMySIo2BkqC7DLqKEruU5+hosb6S0nVoZjgdQwq1Mp2fNGAMdu1YF0rK+5Sc5pxepLWh6vpuoLe24Ztue+DmtFcY4ryzQtZksp0UseTyPWvS7O6jurdZIyMEcj0NdMZXOSceVlmigUVZAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUlLSHgGgDnfFuoC3sPIR8PIOcelebSqCxMhIUdBXSeIbs3N/NJJ91TtUVyzSmebgDCnvWEndnTBWRbt3DKVjjwMdTTLlf72WftzUkLhT97HvUuIjzjOayubJGesTMuWwD6GpPs2fusoP1q75QIxtwPpTDZ7jkHHsRTuHKQLbZO0ygj6U17SQc7ifpVyK3KEYDflV2O3YrjaDn1pcwcpjCAEdSx7jFD6duwdmMd66SOyYj7gHuBVhNP7lc0uYfKcmtkVzuXJ9qcdPdgD1IHIrsY9MXso/EU8aWmCdo9uaXMFkcWbIrtdV46HinHTfN5C5I7V17acGUqUpkVgqNgg/XFHMx2RzcOkNtR1HA4NSHSHQ70HfpXWQ2KjPy9eoqdbBOgBx70ahocU+nh+WTHGD709dKMaA7SCK686eoJ4Ug+tIbVdpXGam7HochNppcE4521nCwZRgjgmu2a0jU5wQT2qGSyQjGAR1o5mFkc1Bp7Fvu9K0Gsilv6OxrbS2Rc8YJHpTZYRtAK7iO9FxnLTW7bcKOh5Jq5ZscIJJenYcAVZubbqcn3FZjxlSdgY9+aEwaNiV4yhzn6g8Vgag6g7gMj171ZilcZ3uQPcZqC8EbLzk96pbkNFGCcK4KHOT613XhPWD55tnIw/TJ615tK7RSfKdvtitHSNSMNwh3YYHIyK2WmplLXQ9uUYGKdVLS71L+wimQ9Rg/WrordO+pyNWdgooopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAHpVe8n+z2skh7DirB6Vzniu5aGzKrxx+tJuyGldnneqXck8zKPU9KzfMEKY/i/lVi8dYuFOT3NZTSbnI9659zq2LscxY8cmtG3LY5YCsuAACtS1id8ZPFRLQ1jqaUEe/bnJrThsN38NR2VtgCtu2iCgdayuXsVI9KyOtW49NXitGJBjpVhV7VSVzNysU47FQPu1YFoB2q0oFOwK0UUZObKptgO1J5A9KtUYFPlFzMqeT7U1rVT1HNXStJtFLlHzMrxwhRgDFSeWPSpMUGnYXMyu0f5VC0I9KuHFNK1LRakUDAPSkNuMcgVeKCmFKhxLUjPeHHOOKp3CFSD0Fa0y4HFUHXJJNQy0zPnTcvNZc8JKZXrXQNGCo9age3V1xjkVJdznUXPykbXHr3qrdQugywJHpWtdwiMneOM8H0qu6lUI+8hq07EtHKXY54qvE5Vgc9OhrXv7ZHLeX8rdh61jEFHIbjnBFdEdUc8tD0jwLrqhzaTNjzOVz2NegCvC9JnNtexPn5dwr2jTLoXdmkgbJxWsH0Mai6l2iiitDIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArh/GdwN4U9B6V254Ga808ZXXmXpiQdOprOpsaU9zjLuXc5qvGOc9hT5/nlwO5pgbB4+6OPrWdjY0LVC7jjrXSafbZ5I4rH0qDewz1rsbG3CoOK55vU6I6ImtoO56VpRJjHFMRMAYqdeBUoUmTLUqmoFNPDVojNq5YDUuahDU8GrTM3EkzS5qPNG6ncLEhNJmm54ozTuKw4mmk0maQ0mNIN1G6mmkqblJDs00nmkppNJjsRydTVR1+bgVbYg1A49KzZoiuR0FRSjbyKnINRyDK1DLRmXKrIpDdf51lM5jLIRnjpWpcAgH2rHun5yPvA00ymtDNvlGc/w+vpWbLGJTtYDd/CfWtC5l2ucjKHrVVohgYbKk5Vv6V0R0MJCWcYZgvcHkelereGCUtEUEYI5xXmUEW51lT7wOGHrXpvhmPZaq38JGPoa1huYVNjoRRSClrYwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAbKdsTkjIAJryLXwwvpNxJZ8t9PSvXJeYnHsa8q8R83k8hAB6VnU2NaW7OTk4Zj+ApkAEko/urRcEonueal0+LfIo9Oah7Gq1Z0+jwZwT1NdTbjAFYmmxbVU1uQ8DFcjd2dXQuq3GKlBqulTChEMkFSA1GKeBVIlkg5FPpg4p9WiGA606kpaokKM0YNFABSE0UUAJSU6jFFh3GGmEVKRTCKloaITUTc1M1RsKzZoiIjioJehqwwNROOKllpmZcruFYt3GQc966KVKy7qIEHI+lJF3OYvAA2COKpwPsYxnoOa1L6LkiscDMuehHauiOqMJ6M1bbKyAx+mfrXqWgY+xKy9GGSK8v0ScJdCKUZA+77V6nocYFmGHGeK3gtTnqPQ1BRRRWpgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAjdDXmHiqBhdMuOr9q9QNcH4tg23TOegBas6mxpTep5peYNwQOimtHR48yLmqLJukZj0rX0VN0wPaspvQ6ILU6u0UKorRjxVKAY61cQ5rlZ0MtIamU5FVk6VYTpTRLJlNSrUKnipFOKpEMmHNPxUSninhq0Rk0PopAaXNMQYoozQOKAA0gHFBIozTGLiikzQTQFgIpjUpamE5qWNIY1RHrUhpjLUM0RExHpUTtUjLVeQ4qGWiKXBrNuRnpVyR+uaqSHOc1JRiXqkg8c1hyqRIHUc9D710N+NuT2rDkUeZweG/Q1vTZnURPaY3o4/OvWdBcvpcbHGT6V5Tph/wBJ8luj8H2NesaJF5OmxKeuK6IbnLU2NGiiitTEKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigANcj41gH2SSYddu2uuPSuf8YR+Zor4HO4VM9iobnkVwvlQhj/FWtog4UjvWbrS+S4jHRa0fDbb0rCXwnXB+8dTEflFWUbmq6DAqaP5jXM0b3LcTcVYU1nzXtvZJ+/cbuyjrWe/iWNScDAHSnZknTL0+tPBxXKDxQpHyn86mh8So/3iM1Vn2JsdOGp2/FYMWvRN95hVyPUYJPuyA07i5TUD07fVBbhT0NOE4JpqQnEub6XfxVTzad5mRTuLlJ9wpN4xVfzKYZeKnmHylvzMU1pfeqLXIXqfzrPudbggyCcn2o5h8pu+bx1phmA5JGPeuMufFZ3ERAKB3rIuvElxLna5b6U0mx6LqegyarbRkhpBke9VJPEFuv3ea8+W5urpiFRjnv2rSttKvGQF5Qme3Wm1bdgrPZHSyeI4SCSAMetLFq9pcEDeFJ9aw/7CZwN8271OKDobIMhznFR7pdmbs2M5BGKqt1rNt5riyby5j5kQ79xWnkOoZTlTUNDuZ1+pMZrnS2ZTGfwrqLxMxE1x877Lw+zVrBEVGa1ohmljZRhgcNj+detaSSdNg3ddteYaHH5t6oHIODxXq1vGIoERegFdFM5KrJqKKK1MQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAA9Ko6rEJtPlXbu46VdchVJJwBWPPrI+ZVi3pyDz1qJSS3LhFyeh5F4jUreyr/ALRq94TG4uOwNM1+Hzb6dguMHIFWPCS4mdQOMZrKXw6G8dJHUFcVVuriVf3duMN3b0q6RzUTgBTwM1zm6MhbCS4k3TvuPrVo6TbhcEDNNkm2Emqs2o7RwaV29jSyIrnRUOdj4rNl0i5jYlJAwq42qE9+aia/z1cfnWkXJEOMWZ0iXsfG0kD0pF1CeA87s1pLchjwVqZUSUZKg+9Pm7onk7MpW/iC5D9Tiun0zV2n2q55IrG+xQuc7R+Aq3bQpCcrUNpmii+p1CS5HWpBJWPFcEgDNXoZdwFTcTi0WmkwOtV3n2mlkJwaz7iUrSuCVyjqt5IucZx7Vz7QzXLFucH1rbmcOeQDURBI6YqlKxbiY39lD/lrIR7Cp47a3i+6mcetXUi85tq8n17U6a3ghUmabBHZau7ZFoojiuVi4AA/CrI1JBjLVmXS2g2iOZ1Z+5PQVnSrIhJimWQA/SnyXF7RI6lNTU/xVdju1dfvCuHhvirbWGDWjb32GHJxWcoNGikpHTMiS9ce1Pii2LtHFULWctg5rTjbdzUkyILqLMLYrgr7i6b2brXpDx7omHqK4PVbb/SWI4OcGtqe5hU2Oj8LtEs9v5rY3HGewr1BCCoxjHtXjOjO32pGIO0DaQe5r1HQZ2kt2RiSF6VtGVpcplUh7vOa9FFFbHOFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBV1GTyrCd8ZwvSuOg1BJgxC7SOq12Gpru06cf7NedsgQuyEhh6VxYiTUkejhIKUJdylrm37UCOA4qXwvDsuZM+lVr0NcTI7D7i81q+HYyGaUj7wqk/dIkrSZqyDBNUpnxnmr0gJY1SuYsg1i2aRWhkXcuAawLy82HHU9gK3L1CQeDXO3dsxbdsY88VpBJhO6WhXEpfmVyoPYVKtxBC4CoGbPfJzVzR9GNzNvuAcD+E1TvYGh1SZANrK3H0roUUzllNotrdL1e3KJnOQtalnc2c4AU7fRl9axFmuZF2NA0a5++elbvh/S0urKcuuE3fK1Eqa6BCq+qJ2V4uQd69zRv3DikxNaTeXsaaIeg5q8tmtxAJ4ORnBx2rla1OxPqQW05ZgK6Cyj3Y4rnobYxXQX3rrtOi+VcjtUW1CTshZLbCE1i3yFQa6uVPkIxWBqEPB4qpRsyISuc6AWl9QKifdO+xflQH5mrXtbMMshPBNVL6xlLrEmY4QMlwPvGhGl0V/NbH2e0Tc5HXsK5edpJL10uJWCKcfL3NdxpccVtlD1z1x1rA1rSPs91I5XdbynO5e1dNNRRyVpSb0MC9jRQNjtuI45zRaWVxdWzyxMSYzgjFSrYQ9LYSO54AwSa6nT9OGmaVtnIWWQ7mzWrstTGPM3Y4gMfMKuDuBrStQXC1PeWkMk37hS7k8sOlaNlo8gGWGK55yTOuEWnqW7FThRjtW1ApC1Xs7NlwMVpLFtFc1zaTADKEVyOsWokkk6gg9RXYoOaxdQgzcHjr1rSLsYtX0MrRLVo5C0h3KK9B8Mgsk7n7uQAK5KCAxIABXZeGwPsLEd2rSDvUFUVqRtUUUV1nCFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBFcrvtpV9VNeeCIi7dD0Jr0c8gj1ri720Md9KBxzXJiYt2Z34OajzIyp7UFuMY71f0yERqQBwBVS4JyQeAO9aWmYMRI9KiLvoXUjZXHEZc0NDuFSY/eVMqcVm1qCehjzWAYntWLfaeQSy9hwK7B4sg8VRuLXd2p7FJ3MGxuFQBbhdrDo1T3+l22qbJYpFWdRgN6/Wp5bLJyAMio/sxGTgAn0rSNRxJnSjPcqW/h+cyFZ7hPK7gda6GGCK1t1hh2oiiqEUD5+VWJPc1aW1kc/O2PpVOq2SqMYiR2sJYl525/u1ZjtordD9mUqGOWJPWpILRY+QtTyJhcDvUdBvcy0g33ZYiuhsk2gAdqz40CsDWraYxxSgtRTehO44rJvY8g1sOeKzrjDCrqIzpsyUj2ZHentJKqcHpUxjyaf5Q24rNGxktdsp+ZfoaYbgyAZxj0xxWm9qrjBUGqr6YpOUJWjUq8XuZkjTb8RlEX1CgGq89uZGzLIZPrWt/ZUvZ6emlEH5mzReTBcq2Mi2sFDfKtbNvbYUVZhshH0FWkix2peonIrpCEPSlccVZZagk71NhXIV+9WfqbCJ1YjitJBl6z9Xj8wYHarekRRV52K9tL5mSO/Fdd4dXZYkY/irjtOGJNpFdzo6bbIe5q6Gsrhilyx5TQooortPOCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAQisLWIFW5WTpuHNbx6Vl6ymYEb0as6qvE1pO0zkbtNrnHer+lriJh3PNQ3kJD7u1WLAgMuO4xXFH4j0amsCX/AJaVZjANU5CRPirET0PcztdE/lg0x4Ae1TKwxT+CKpak7FE2g9KT7KB0A/KtDb6UmwVVhcxTW2qVbcA9KshMUuKaE5FbYFFRSHFWnPWqErfNUSZUVcB1rStD8ue9ZiDewxWrbLgAUR3CpsTyH5KzZ2xxWlIMisy5UqSaqZnSK4fmpUYMcVVZhinwN81ZJm7RcCZ7UvlD0p6dBUmM1qZMgEXtR5Q9KsYoxTsK5CseaUqBUhOOKikapsUiKTiqsjVOzZqpK3FZs0SHwfM3Sqs+HuJAegFWrM/eY9AM1nq/myOv98nmrl8IoL3iO2i/f5XoK7TS+LJfrXNRotsvzDHvXUWC7bOP3Ga0oKzIxUuZItUUUV1nAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAGqmoxGWzkAGSBkVbpCMjB6Umrqw07O5xgmEzeWRhh60hVreWMr90Hn3rRvtPFtc+Zj5G6Gsm9nMYYenSuCUXF6npxkpLQs3Z23BPY80+JulQXDb4YZR/EtEL8ipluOOxpxknvU6njmqcTVaVqqLM5Ilp2BTFanj3rQzY4dKYaUtimM1AkiGVsA1mTy/PgVembisxVMlwfQCspPU3gi/ZDdg1rwkAViwzqh2gjitCK5UjGauDsROLZdYiqVyu4GpfPXHWqdzdouckU5yViIRdzOmBQn0pbZwWFO8xZsjqDUNuCspX0NYHT0NmI8VYXpVSJsAVYDZraLMGiTFIeBSbqYz1VybA5xVeQ053qu79aiTNIoY7jmqU0lSSSdTmqTvuas73NUi+j+Xp00nQ4xVSwkUKCetT3oKaSidN7VQgDi4CIOvSrnukRT1TZtLam8mhTnBOT9K6iNQiBR0AxVLTbQwQKz/6xhz7VfFddOHKrnFVnzOwUUUVqYhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFJS0UARTQrNGUcZBrhdTtiLtoo2LKp5bt9K7yRwiZbpURtoXj2mJSp5Ix1rKpDnNqVT2bOSjXdpY9Y2xVeJsGunv9PhispPJTb3OK5Vvlc/WuapBqx2Uqilc0Inq2knvWbG+cVYR6zTLaL6ye9SeZ71RD0/zcCqTIsW9/FRs4qDzDilBzVXFaw2QZzVHeIQ4PUmtQJxWTqkRjBdFzjrUNFRetjOubxIHy8qpn1OKuW18cDLZB71yOo2yX7MDkue57Va0mGWyi8tnZk6YJ6UNaXNLdDq5L8BetYd/rVvFOqTzhCegpJ5GaMiM/Me9Yk2hrLKJZSWYc5PehJPcNtjrLO6TaHRgwPcVegIlmytcxYJ5GI4gST27V12nQ+XEN3Wla4T0LSAipAxFB6Z7UzOKrYwJC9RtJTWfioi2aGykhzSVDI3FIzVXkkx3qWWkRTv6VFAm+ZR70kjc1YsVxKGNOK1Cbsjal0hr23iAbaFpy+H4o4y+4mdRlW9K17YYt0HtUprs9nF62PPdWeyZWsZHktUMn3hwatVDAoVWA6ZqarjsZvcKKKKoQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABSUtJQBl67M0NmhXu4BrTU/KpFZHiRCdM3L/AAMDWjZyCWzhcc7kFZp++0aNe4mOuU8y3kX1FcTdLtc13RHBFcZqcZjnkB9aistDXDvWxUjfHerCyE96pA4NTI9cbO0tiQiniTNVA3PNO8zBoFYuq1TJVONgcGrCSUXJaLYIAwKguEDpg0CUUjNmquJIwrjTEMm4DkntSG02pyK2mi3DOKgmgPAxU6l819DHSH95jHFTPZ78Vbe2z93rVpLdto3Ua9Bt2KlnYpEc4Ga1oxtAFRLGVFPD4p7EN3JS3vUbNxUbSCojJ70XFYkZxURbHemM4qMvmlctIe78dapyydalZqqymgpCbskYq/aZaVFHcis5Ota2kpvvI+O9aQ3Mqmx2CDCKPQUpoqrqN0LOymmbjavH1ruvZHm2u7C2c6zGbac7H2mrQrI8OQvHpavL9+Vi5z71rilHYqWjCiiiqJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAK93At1avEw4YYqlokjLbm1lUrJCcYPcVq4FUL1vs5E6qTjg4rOWj5i46rlL1czr8G243AcNzXQ29wlzEHQ5B/Ss7Wo0khGSN47e1E/eiOm+Wepx7HDVIlEqbWIoXiuBnorYlFITg0q04qKQXFV8U8zbe+KgbgVl6hczqMQIC3bNOwG9HOpGWaiTU7eEctk1wsmp6op2yRKPoTzSie8mP8Aqsn61XIyoxTOsk8QgH5OBUkWvxyAb1BrkRa37niEfTNSC3vVGWt2/CnY19nHsddJrUKYKIOapt4iYNk9K51Y718A27jHvSNp+pSD5Ygo9TRbzDkS6HUReIUYYYVZTVIJR94CuSGnagi48sGopre/izgKCPeiwnCPQ6+a6X+FhimLcbj96uOhh1e5coZQiDuBW3Zwz24AlfcalpIyemhsGQE0obioFBIz3qUcDmkAO1Vn5NSuagJ60INh0YyRW/oMWboH0GawoVyRXRWNnO1p5tuwWQMCM/xDuK3pq7Oes9LHQ96xNVgm1K8htUBFup3SN6+1XZXvXQLFGqE9SxzVqCMxoAxy3c10S97Q5Ivl1HRosaKijAUYAp9AorQgKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmsoYEEZBp1FAFAaf5UrSW0hQnt2qJNLZp3nuJTJIy7QB0FaeKMVPKloVzM4rULYxSsCMEGqKmus1qy8xPNUcjrXKyrsY1x1YWZ20Z8yHo1TDBFVVNTI1YG7QMuRUDQ5PSrRpAtAjPltY3HzAZqubcRNuStOSLPK1TdSDyKZpGbQkF75Zxjmrov1x1wcelZpjU845ppyB1qr2NeaLNVbseYW9acL4IhxisgOfWndRT5he6WJ9RZgVXgGqyKZTk85pwRQcmnpuJwoqbg5pKyLEKBPSlK7u1PjjIGTUgXFIwYiCnMQBR0qKVsHFAIZI1R0FqVBuPFUgbLdnEXcD1rtrSHyLdExyBWDoVlvfzXHyr0rpMV2Uo2Vzz60ruwUtFFbGIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUANZQ6lW5BrldY04wOXUfKea6vFQXkaPayeYMgKTUTjzIunPkZwXK9aerVYu7YAeZFhoz0IqluKnFcElY9GMuYuIwPFSEcVTSSrKNkc1BTQ4AdKDbhuop6ipkwRTRNzPex9BUTaeT2rdSMHrUghX0q0hcxzg09/QYp66e3cV0Pkr6Cjy1FHKLnMJdOHcVILbZwBWqyD0qtKBnjik1YalcqhD6U0jmpjxUTnmoKI5Diqshyallcc1WZs0xoM81o6ZZvdzBVH1qnawNcShQOT+ldzptgllAFUZc9TW9OHMzCtU5VZFi3gW3hWNBwP1qakpa7TgCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKjnG6Fx6qRUlNcZRvpQwR5t9tls7hwOUydynoamLRXCeZAeO69xUF0imaTvgmqJ3RPvjYqw9K89vueoldXNBflP0qxHKAetZ0d8JPlmAV/7w71YVh6596hopGkklTo3pWUJSO9TJOwqdgaNdJeRzU4kzWOtxk1OLj3qkyXE0vMA4pjSehqh9p96DPkZzVcxPKWnm9Kru2etQ+fjrUbzA1N7lqJIz4GaqSzdabLPkYFVnck+tKw7CvJnpRGgYFnO1F6k1BJNHCMynLdlFUri5kuSN3yoOijpVIGacV/511DDB8sPmDJ7tzXpaDCj6V5NYfLdwn0cfzr1lDlFPqK66PU4sQtUPooorc5gooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmt0P0p1RXEgigkc9FUmkwPOb8FbyYD+8apsN3NW7077h2z1OarbTmvOk9T147FV0zwaYk8tueDuX0NWynFQPGecihMZPDqEbnDHaferKyAjIIPuDWO8XHSmjcnQkUmrgbolxThOQKxRcTL0fini7lHcUrD0ZseefWjz+OtY5vZAO1N+2yn0osFjZ86mNIT9KyTdzH+KonkkfqxosI0pbqKMfM/wCVVJL93GIhtHqaqhM9alVeOBVWARU7sSSe5p2KeF4pSoFFwsPtjsmTHPIzXrFucwRn1UV5OgAcGvUNLl87ToH9UFdNB7o48Sti7RRRXScYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACVleIbjyNNZQfmcgCtQ1yfiO78+5ESH5Yxz9ayqy5YmtKLlJHOyHLHvQMkU1shiDTlbjmuBnppAV9RUTKPSrHFNKgilcCm6VAU9qvMoFQleapMZB5fApCg9KsbaQrRcCsVpNvtirBUUzbRcCErRs5qbac0oQ5ouBGqVKqYp4SpAtFwI9lLt9KkK0hXilcCHo2TxXoXhifzdJVc5KHFeennrXV+ELzZK0DHAfkfWt6MrSObERvE7Kikpa7TzwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKY7hAWY4AoAq6neLZ2rNn5jworip2MjFm5LcmtLVb03l2cf6teBWey5XNcFafM7HfRhyq5mygh80JT5l5qJODg1idSLCjigjNCk4pwGRSAiZaiK81aK1GVoAg25NIVqbZikZeM1QEBXim7amIppFAIjC5NPWMU4LinqMUrjGiMYp2wgU8CjNIBjLxUb1K5qI89aYEZHFXNOna2uUlU42nNV1WnxqRzVJ2dyWr6HptvMLi3SVTwwBqauW8O6mIl+zyn5T90+ldQDkcGvQhNSVzypwcHYWiiirICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAOaM0mcVUudQitxjO5vQUnJJajSb2LEkqxIWcgAVz+qao0wKR/Kn86ivL2S4Y5PHpWe3zPg1y1K19EdVOjbVjMZ5NIVwKmCUMuBXMdJl3C81WA9au3I56VUYYNI0Q9SQMVKDmolqUYxzSGL1GaQ0pxTWyO9ACUw8mg0UAJjmkx1pxHFAoGIBThRxRn0oADSE07PFMIoAaTmmKuTTiuaeqYpgAXinhaULUgU0Ejoi0bZWuk0vVymI5iSp7ntXPotTrkVrCbjsY1IKe53CSK6hlIIPcU8HNcrZahLb4wSV7it+21CG4Aw21vQ12QqKRwzpuJbopKWtDMKKKKACiiigAooooAKKKKACiiigAzRSUUALRRRQAUUUZoAKM01nVRliBVSXUY0yE+Y1LkluNRb2LhPFV57yKEctk+grNmvppeAdo9qq4LHJNYyrL7JvGj/MT3GoSzZCnavtVJ8kHPepSozTCK55SctzpjFR2KzCkVMmp9oJo2gVBREUwKik4FWG6VA65FAIoTAsDVNxzWjIvJqnOncdalmkWMQetTKuetQpzVlMGkUIV70xhU2KjYUCISKTFPxRt4oGMIpPpT8ZpCOcYoGNJxTQTTinNKFFAXExmginhaNpoAaFp6r605Y/WpAmTQS2IqipAopVXNPVRTJuIqiplXimqtTKOKBMEGKnUkdOD61GOKkXpVJitcu2+ozw4Bbevoa04dThkADfKaw1HFPCk1tGrJGEqUWdIkiOMqwNPzXNozx/dYg+1WotQmT7xDD3FbKsupg6L6G1mjNUotRR/vDbVpZUcfKwNaqSexk4tbj6KSlqhBRRmigAopKWgCs14q/wmozfgfwGiisOdm8YRG/2h/sfrSjUPVKKKnnkV7OI4XoJ+6aZPdPsynFFFXzPlI5VzFB5GkPzMTTQvOKKK5t9zoemwuMU0rRRUlDWHNNIoopDGEYpCKKKBojfiojwaKKBkMignNVZkFFFQy4lcLg1Mq0UUiiQLUMmQDRRQBGgzT1WiigYuwdqTy+aKKAGMMUqqDRRQBJsAGaQAUUUCJFGaftFFFBLHqKdgA49aKKoQ8L3qVRRRQIeBT1HFFFADxxUi0UVaIYppueaKKAJF4FSrKV6UUVd2tiLJ7jvtUg6Maet5N/eooo55dw5I9h638oHODUi6i3dBRRVxnLuRKEexPHeK/8ACQasBsjNFFdKehzSWp//2Q=='

class App extends Component {
  state = {}
  async componentDidMount() {
    const uri = await ImageStore.addImageFromBase64({ base64: IMAGE_BASE_64 })
    const stored = await ImageStore.getBase64ForTag({ imageTag: uri })
    if (stored !== IMAGE_BASE_64) {
      throw new Error('stored and fetched uri do not match')
    }

    this.setState({ uri })
  }
  render() {
    const { uri } = this.state
    const image = uri
      ? <Image style={styles.image} source={{uri}} />
      : null

    return (
      <View style={styles.container}>
        {image}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex:1,
    minWidth: 100,
    minHeight: 100,
  },
})

AppRegistry.registerComponent('Tradle', () => App)
