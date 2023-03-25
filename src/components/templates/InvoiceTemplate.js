import React, { useRef } from 'react';
import jsPDF from 'jspdf';

const InvoiceTemplate = (props) => {
    const pdfRef = useRef(null);

    const downloadPDF = () => {
        console.log(props);

        const doc = new jsPDF();
        const reader = new FileReader();

        // Add company logo
        // var imgData = "/home/abhijeet/AMAN/Code/MERN/SDE-Intern-Assignment/invoice-generator/public/company-logo.png"
        var imageData = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADNCAYAAAACEk3mAAAo+ElEQVR42uydD4RV6RvHjzHGyBgZyUiSrJUkWWv9JFnJWslayVrJWkmStbLWSveKtbJWkrWSrJ+VrJWslSQ5kyTJSrKSkc6RZKQdScYYY1z393ln7p37/sbMdP8997z3zvfL1/O9zdxzznvreXre977v80SCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC0BLkh9IoN5RuxvZGSwSMtQ8y5iQSBKGNQLBakY+TG7k4OYATd0UdjhxjZJzf5IaSy9jlkSAI7QOc9mtYgE8IWuujDgcBayNjfUaQnkTvjwRBaA/gtOsIUo9w3CIkaCWncObuqEORj9MexnzOjTc/zeQBr9dEgiCED5yWAJUUsMUSX+bidEvUoSBQfUiAflUZbzKFPR4JghA2yCw24cATFeeFceLsjU7MstyY4N+sXTHOypj5DMZ5vS4SBCFM4LT9ZBp/wOJcljKuXbkOWoDPMxbG9XmOsbkxMjYIS5qf/wqXRYIghAec8xOmfmPY4nzkZ3exK6MOAcFqFeN5kCtnVlhfwzG4PRIEISzkCER5AlJlSpRg5+qkgD0adQBcdsW4fsQWYCVIzdFkW7e1zUEQAgOO+R1Ba9LPMBbQKXZj1OZgDO8xpqeVwISdT7Oex+tDkSAIYcBN8+BLWKyCBZz4bNTmcGt1bix+VrWQhiPKsgQhADAt6iEA/Tw7/YOLaP9r//ejNkU+TrbnylPBGMK3aQLcj7ynJxIEITvgkFvhqJ9VVKkv59ow6+D5V/Dc19wYauQIfC8SBCEbkF31usADZ7YuYKvVpfWuvVGbgezqS5dd+RljDfpiPl46h8EFISjghF/ggOPlQIQu1qLhA7gqahPwrOvg49nnx9aiCfBvsJ9HgiC0FgSePpxvOEcAqptD6VSujY6wMN6TcMpfo6pVM957S6nkjiBkDhbNu3C6b2GxCXwF10aBg2d8B040acwH+Qw7Zse/IAQNHM6dF3wGZ/cdNaaT/4Z8hIVn7ON5f/fX4BrUj7EdX3JHEDIHjtaNw50lQyhCmMJGdfoK7ogCBQHrE9aixrznhY1pAuBpPseOOwwuCEEBx92BA49ivfWZxjXXvOEOT0eBgWcagLf99agmaJi8JID9JxIEwSy76iEruONnDM3S7ggLgSG4IyxurY5gOpmPvW84m6FnpsPXOrHkjiBkDhyrC36Wi+ccR2mixqGfhnSEhUA6yHhHoPeMzdOQzzJxJXciQRCaG7BWwfuz0zishSbLyhMosss6/GySbQx+YDXRcXIXOxgJgtC8jjBkAydwroK/HmOjk5chnDNkzFsZ86gfZIx0AfttJAhC07KNzfAZLLaEcfJ7Ps7uoLDbYsEzXJqtlkqAsdSwI0ruCEIQwJn+gBVnM9fJazKcXVFGIJh8zvOM2QdnP8tKzkWCIDQ8NdpePo6SiyG01eWa6Mm9LDaTkln18QzDPENlXa01eorA9UEkCELdmdUKGPsZUIv1/lzcuqYVBA1X9vgrd/+M+CeZVjDfkgpCW8EFjPz0AWVv71Br9XArG5Iy3ncZbzpbYQG2UGPTSQLWvkgQhJqzq7U40jAZR2W61lqNTQro03mvNZhxf8Fz/tm/TDRdo+HqSBCE2kqpuPIv/rm/LDQB6zkZ139akF1tJ8sZ9XffZ6LjhF317VNyRxCCQHkbQ67ETHWcXmnBeG/AYhhMXk1PhQVBqNqBv3ZljCvdjGFGuvQt5Sdoi29B3Vj3wYI/PctYw/S3kEvuCEJQwFlWTHdqjr1pS7b6JlnHoME4V8O/w8isfLpyyuoaLQi1OPNOgsS430ghY/2NwRiP+VspQtIwhn2RIAhVOXMf2c15Ny0LZGr4BK5vdvfmymbVtBiYHlfXaEGozak3wIkwpklpAf7C1/7NKpdzARYCGdtCdAE1uMKGghAsprc4cHQEepscM9IzC/CbmzCmLXBq5ngMxIaqGfPx/JDKKQtCtXuU1uLc/7ipShCkeWsjR1i4xgp4fXbNCBu4fpEf0jlDQajlnN1hl2X5B5Uz0thkAru7zmDl+CVjmfCPxYSuGfOFXKxyyoJQbcCaPgjtN4/IVif3eb2yjmxxNe975Fc6bQdNpvUG+0kkCEJVaz6O22YaMnjf3GWgvc2kx+vYKHoytE2i1WnH9D5WXaMFoYYM5VJA36y9IgCtriHoroNv8uVD1rAN9RfqGi0IVQJnceWSRwLaTHomR9ZRTdljeD6MbKkRnTyG70SCIFS3f4lg8T22EMQ6D+WUsR9V8dy7CGzjgWRJjWg+9/SU+hkKQk21stJ//GJ7WWoyj6s8U/8iWWE/v3eTgDX7bWOb6+fa5iAItQWtz/12VRnrcXhgkXW3I/x80q8/1QH6WiQIQg0VOuPkdiCL7zB5ApfP85wr+fMXYTxjM5lMuc5CeXWNFoSqg9ZHOM1oKFUOyLby/toOAbWbPz/hfh5QNthMfTMXsxdNEISqtjh04zS/+hs7s9QEzxH0Jm9X+we8Hg0jI7Jioq7RglBjNYensxs7YbY6cRUYeuEyeCmwjKjpOlcuuSMIQtXdZo75mQ7MUrvNpB9h9/D6TRhZkCkLBOozWssSOgajo6PLjKeGy/jKfTiALQ7lbOs+9mGlxHJS7GRdOi61KRKEdse///47QMC6iF1t3NJ+H04zFsg0iawDej8z0NcJ0o/9P89WJ5cZv7pGC+0LApULWPvgJPo07LEsp+zaceHElYaoGWqsJce5xwbsoVDOVfI8E9g9kSC0KwhUa+AwgaoI38BtxlnWNtdTL4wjO2YswNMRwA4w5uuBrGWRbSX3sYORILQjCFYn4ZQLWI7oa9g+u5pZaQ8OcyrnVcvMRBseQIb/wLWVnobJdl5PhnA42nWNxh6LBKHdQGBaC8dg0eMY3Gv8reEq+MqflmWgLVheGzs8z5gvhpJl5eN0lOdU12ihfeC+FSSbuoAtYovOevop7DcOWt/mS4X+IExgK7XN5lQYExAH5hnvJn7neRiVWKeD9lmClgr9Ce0BAtMul01hZwOWr+FRdLdhwFqJ89zJMNOw6NozxXV3wHnGm3Txe8f5nYL/3qw0z/g6x7NGghA6CEbL4S1YXIRP4XrjLGs3nMjgK36rdaKLb2lusY7A9TCcYn98Y6uu0ULoIBB9DSf9aeAC+rzlNgccpg8Hvpj3Dii3UDfxenCm/tTmKsa8x39vxnoCHowEIVQQgFYQiEb8wLSQhg67IkPgwBvcZtIMnLaZpZgLXPc4uquKrLKH378VUPnoND+krtFCgHDZEjwBizXwFuwynhqeIXAVWr4DfNom2MY09hF2XQ3j3ZljL5p/nUx1nBxVOWUhOJA9bSH4vPQzqWo0dr9l0CLDcl2jhytn/RKsua60fIeNaPhZjZtnuwlYv/nXyVCXu0ZvjgQhFLhtDPAiLNbBf+A6436Gh3GiqdnzftBYQ89569VM72BPHYfBNxC0Uv+aGesL0+MQhBBAwNlDpvTGz55q1N/bZFl+meIWl1NuvAqCm9btbKDkztGAKjpwXIrOQoKQNQg2vQSbR9hiveT9I/A947WsbaU65LPTFVPd+BaBc1ynu5GSO1zncRhbHKb1vXystSwhQxBkugk4X/kZU526AP8yzrK6cZhL2ELO6/5ipBs6QM37U6Z0G5twGHwv1xwL4TA4z1LAHlDXaCEzuLUnAs1jPwA1oKfgVmhYzSHZUloELjoGUdVhPh2nx7DdzSi5Q4C4Fsy4hlwvyUTnDIXWgyDTRXA55wedRjX2FlxhOzVMvs97tdjtdAJLtgYNH7t68E0sueOC9Gv/Xllq+FMkCK0GgeXD8jaGJnIKHjLvGj2UPMh5+6UMtOekNekxgt3eJtcI6+Xap/x7ZajdlPk5dkskCK2CW2uC1/xDzc3ScNhymwPO04XTHMBWKoUa6NLUrkbN9M3g/B3XHcyRZfn3ykqX1hAvYrWWJbQGBJVP/alcMzUs8PrnyBgEl9s48mw21Fztt3ZPqtQEFMPMg3uU2uV7981Q57TNQWhRdrUa3oNFQ47DjcYB62P4yrBH4UzgqlLjyJfJQvoMp8IruNdd/74ZapjcVDllwTqzcgHrG1jwsyILDc/z2tKBu3GgC24aZ8Cad8eXmsFuMF6/+4ygOOnfNyvNc0zBg+pnKJjBZT0EkWewaE3uNQE/M+8aTaXO2SkdtnFd/6J0njOAlkdYGGsfvODfN0vNszzlM3snEgSLhXYCyX+xBT8jMtZ3sCuNu0Z/Z3IQOkaXbA16lKC1yzhIbyRgjPv3zVC7BfhfIkEwmAq+j53wv9Uz1H6WdcS4NVg/5H/6StebZmpsjTq9TdAyL7kDC/59M9TjOYKopoZCs8seX4XFDPia4DVo7MD74HjzCtdBr5hfjRqbfJkjaFnuRYOP/Ptmqfnc/lKhP6FpKNWsmvSnbC3WP8New28M+3Gc6+XqAm66Ur9u/PAzweo+dq1hVtnFPb7iHpOB1ICfQKtrtNCU7GqQwHHfDyKt1thR8EFkCILNh24vVNPafDXuxD/AyLLkDkHrTiCVHLDpHezySBAazK5+qmobg72+CpcZZh29OMzPzTma463T1KuHkhdc533jc5Vb4ZR/36w0Y51CH48EoZFqDPANLAbAcYLXF8ZrWWtwnpdhdFBOCthL0HIty00N/8QWghiz+5Y0TldFglBHsOqFZ12GE0jAchyGPcY74N1UbCrnbXSsQzcj84DJFHab8dTwA/jCv2+WGnta5ZSFeqaCO0vbCvwtB5lr7HfGhf4G8t4RFnSxLu2t0TSiudZt9ErjzPIH/75Zavia19siQaghWLltDDdgcS4DWMt6an3O0HWqKTUC9b75q1Un5deN6NIRltS65M46AuMD/74Z6yva5iDUMh38Ek6UspvQApbTZ7GWDtyP41zOl4/bwBp1ZWqIbVwnj7juWsu1LHjAv2/Gegy9NxKEaro3w5cBBqlZDV/Dj42zjvU4zUSdR3Oa/fV/AX0mMgZB+k4g+7KcTrXNQaime/MPXnAIMsMq8SbsMQ5av+A4hXw5Y4JVaoua6GMElE3Gx5R2MTV8HUoNeKbDRxmzOu0IC1djgC/84BDYt4Rz+amtAyfvunOGtR/u9ZwO2ySNTc6j+wy/Ie3h+uf9+2ap+eyfoTdEgrDANoY//YAQ6KK7rx+i1xo6sMs6DmMLlekefKv2nK55GqYTcI91yR343L9vppoAqm0OwnwB61Oc/3UgmVO1LMDjsMswaA3iMDdrOgRdyYicbbJO70LTkjtuKubfN1uduqqwH0eCMGft6v48e5+C2Hu1mIZPofXazs7K//6wGu2txzRTc+1JXhuX3EmWEyxS/75ZangnEgSvA87hQDKmevmn8TQJUgLFK8xXhTbcGU7WYb2ZNJ7pGh3EOcM4dXq/Ou0ILmCtd6212mjdaj49CbehIyu4Xno4z/NS9gST4iLafI0Hexr2Gu9FuxbEOtaMvp+P1TV6yQMnP7VYsArtaM4i+hpcbhiwunCeUzVUazCiv7aTGFdzSHfk41LX6ACoag5LHDi73715bubSdtkWPGy8sdJVc3g4238QO7/2MgSsleZ5rru29obj7XGZnNlYah/vC3dYOxKWHnDubpz98luCQTtlWI4PeW1YqTOZPsKCLby17K93sNdK48BjBMd9xlnWKu416t83E+2V3NFa1hIEjr0TFueyzfZhzdc1+idjB+6FD97iYC07wgIf87rHOLM8zn2mwjiyk05ht0bC0gFOPYhz/112+E6ZEnqddt41/gbtIxzn1YKHeFvvyMdgt2U5Zfh3MOWUh9Jb2BWR0PkobWP41usvuBDb5XjOfLwA+4yzrAvQr+Hu61aeu5s5KGzfNXoPmdZEIOcMJ90JBE0NlwBw5Hfg4yqylXb7ltB/7vEWVHN4D454nW6K/6/LtjWagHXW8qAw9+l37bj8+2apS23K1kZCZwOHPh9IFmTNu3CFcQ2po5Wd2WnR0+XAhYb2GiavsDsNv3BwY94IJ/z7ZqgLeXWN7my47s1wopqsqo0qNizECfiVcZbljrA8w/rt6Z1ueUPS3Iy9Aa1L7pz1S+44m6EeJ3BtjITOA87bT+D5a4kEqzJfQON66Mkhl3XMOfxcbsPeag2T3bZNOtJ3uddT/75ZauwFxrwsEjoLOO4XcLKGtaC224c1n8aewvYaOvAynObqnMX3LLvOuI2tluWUIUE6TgthnDNMJtG7I6FzgMOuxnEb6d4cTACqVWNfwi3GWccOnObNTAG6OY1U4xZryinDvHE/w0F4y79vpppqDmRZ2ubQKcBhj5WzK5+dtnF0IQ3/gr2W2xxwmnPextGsF6Wf48wbjUvufBzAwru/zeFIJLQ/XPdmV5ivTodvi5pYb9PYMbjP2IFXu2/qcl6GBWEGGosTW5fc6WKcl2amhhmPF/I8r/n8ByOhfYGzLoPn6symOiZglfgQLjOeGh6Hk36mhc1Cl4+wfGjcNXorHPHvm6XmWU6qnHIbAwfdjtO+gcUl9u3gQvzKtpxyuio/VGlImoPYjDR2pp7VgPFetJMwiPHyuY/C/0RC+wHH7Ic3yoFHQWu0XE55g+G00DnxZ3Aczi4KZ6V5Hrdf6qDxVHgN93wYwnjRjldhXyS0F3DQAzjneNlZFbhmeRZ2Gx6MHuB/+Sv+jvcsdc58m0PSRSZ3gHsVwhhvMob9PBLaBzikW7t6pmA1Lx22Gi9IbyazmfTb12enCSRM24zH203g+ieM8cKhZDgfazNpW6BUmO9EswMVrzuCpfHcgpblWGaPsIRQQwqOux3qxkHrY7K5V4HUzHL2KFTX6NCBI27GMUeavPYTzJ6qJukC3AO7bBuSJk98J8pQm3eNzs90jf49lPGSZaU5dY0OG6Xs6nyTnbwTA5bjPbjKuNDfNxkfW/FbwI+hdxlv63BT4ReBHNkpTm/mVZYVLnDIPXB2G4PWsBZlgbFZd41e+X9HWGCG2r5rdJx0c/1joYyXLEtdo0MFztdTLnusgFX9NgfsZuO1rE8qTSsgzFBPwK+N17L6YRrIeB1vajNpYHBZAtz/tsCzFA8/L6Zhgde/RbZwmcf1AKZIZWcewa4wnhoe5D4TwUyHKe8cCeHANV2Aw/VkGR3SRLURPQW3GWcdH8AXGRe781uQnUb3GAasPng9mPHG6QMCqLpGhwC30A5/dNlCIAGgHfUV43LK3QSJU9hs9yhV7GiOIyz2JXeS14GMt+C6RqtpRQDA2VzZ4xdGU8G2Ly1TjYYF+IVxlvUOfBLEYjR01Rxgj2lnIRpjBDTe5wTpTZGQCfxtDNeMp24dtXF0IbopNXaNYcbRheMcCGNPlmMyDq27Rq+BoyGMl2Dl7MVIyAY4mONHsGAYrJZMwIJT8ISxAy/Die4F0NevzEc4cq/x1PB77jMZyHgnCdJbsZHQYuBcKwkkd2BxMS7VKqN16jfwHeOgtZsg8cYrtFfMUvMsX7egnPKDgMZ7HT0QCa0FjnUEFup1zk5upNqIxl7AGnaNTnpdpxe/YmbGOjUvpxxPl9yZCGS8BZ7lUCS0DjjVepxq2Djj6LiDz1VyzE21jbOs9+FIAH39yiVozph2jaZ/I/e5Es54qSyhrtGtA051BhZC2THegbwF+w0zjm6ymhP5Ic+ZstWj0HgvWvIegWsyjPEmUwSsU5EAWlONYbIFTrskjufMx9Lne8T6CAsO/CyUHfBkHbew5iV3YCGI8cbpWF7VHMwzq14c6RfsS+xLZ421/3qp6fuwx7i88OHS1PBl5ozTF9gPbdeykvVuAT6I8UJ4CvZGgumu9kG4ppXEgZeq7jbOsnpw4tWuLrojGpuddllfZAzuNRjKeLGDKj8jCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCILQpEOkHFZ9t8TeGltOLccOTDOGc3SuSd1UuNZKuJnSJduxO3nmndht+TjZzL1Worua/Jn0lT6PrdzzY+xOuAP9AT9bh+6ptmGEazbKe96jdtIO9M4St/B6fa0n/HlP5fOG9R4yLr3X57KFDlXDgUXY1UCFif7Zf3dxsryBz6Gf111Vjrur8j7uufBn0lPlc0DuX3pfThUbbOEcBmf6HTtc4qc1FI9bz3sv857bCzJOr/F7v6IP8Ze5Nh8nPTX8g+4qnfw/zn3uYp/DCa8hwBjXfl762Rn05kYciPe6MfVx7X0891X4OE/NdILUbOMB9EvsQ3iJn+/m530LOQbXWsfvn+D57vB6BD1Z6cKSvOa9T9B/oj/FLqvyGf8of7Y5yLNe5P2DNY0zxrG8v6OS3r/A/XZUfgfO0fAK4zyZmwnC/bV8/rznO35/mOeH6Q85r1JpLZ8D47nMZ7muyn+za7zn/2PONc9449oLq/ksV7nruGvy/FexmyPBtpMwH/ILrxvIZV53V5mFvI/DjLj3Vck38DTXH6jiH0I3v3uEexCkvFbhi+sbcKCB//G38f5bVd6r1EQ03TpfRxt+5yAcreo6VK3EXoWrq3hGgmg6t3jcJzX+nR+CRf868PsFfnfv7O/AxTTjuI/+FHZX2XY/9a7zCHqt0Wr6HGByupr78ozvzj4z15gz1n1wvHTNm1xzoIoM67D3OVyZnlEIpgGL1klJAetYdAECu6mOgEUmkt7EXnPkZ8463ufPR8rXR0/xs8Uab5ZT7F8gGQ3XjiFBFefkfcl3vD7Ma8dv4WX+/On/2rv+CDuuL75/RK0VVRWxVqwVURERX1GrIlbUV8RXrYqIFVUREat/RMSqyjwlIqIiKqIqVlStWBUVVRHxVEVUrLUiVlR854mIqBURaz1rPU++nzP3c/cd850fb+Z1Vv84h2Pue3PvuTN35p57zueee0fkI+9hcF8Z4sv6QupiOzQha07aR+pydYan8d911Lcg1waeje9fjnMD+P+CtwTdfYfPUf4W0mdFjjDl3gM31T3Oo949OR3kKa3LtY6iaNwouDvprywrMnIVVidP9Kz5XEM5/k6rfFUpgVe01vKu44C8d1TabfIRnafLdnBcl/cjPNC1wkLZuMJCeWmbB5TZyrseGXhRZo75m+Ly9xlVRXRbIvcmlJH6CY5UKI0zRT6AELhy0omHEh7qIF6OUci8AvktpP2HKP+TgTGcQbk15mshfQ88mqTk5D+c24PjqaKjGy05kbErcDtlRtfG0ftz8JaU6xvCfRyTcgnnT4BXIjn1yHK6xT3INyW0zeZIUdbhFnXa5a64bBlt/pQj+jOwdNKos+ZYF7r8bvASFdZDpWjOpwxKx5RSuBlXzuAdOHccrC2ev7LuQdoCea5SCS7LQMGyP8Vdytx24EDIAetO3gcwiJnxOqmwFPG5tpjnThbGKO8InllTeSbv9hlVCrZ/xNGmLaM/+BlH+kdFLSy6A0M5ymFW8lIxXkt6OfHfR8i3JHl4LdOo490KlfZ74LusyyuC7T0A2a/A3t2bEfm57egmExq8hhb4q/Q2dx0Vx2WxQiVNS+Ngl67UFPO/wfEyB5BMC4t5lMJKzLcT+Zq8Hsk7mZF3RCwkV2+kFKYlTet+d3fvHhWWK/NEtcOneRYW69IWlr62LeD7UR6HXx7KeP/nVL37+oyqo8BhRN+xky6h0fdxY38/au3u1sJi51zAcSjHjD+KeptUWL8ECYA1zguYzQ4fgdXDFVuZR/jlk7fg1x4PKmOpofwZ9e26l93iaWh7sdpOsizaJuqE/WkdlQpB8sps6bKkwd/lWVmQ20+Q+i1du0mmUxVWAIWl8tzMuY9ZMAea8AavJ1EJKojgJPgolXwLx9PdKix+uQbvrsjz7RDO853JtLBq7nk/TZn1O6wmdn5OkXMI3Kacu9Hga1QNsYNtk2+q8UV8iPQAAdMVmsMX8h4C8lBhSX66hNmj+ycosxLQhEZ6c/zLvk6hQR5YFFy1XxIOZSZPT
    PlIURBnKgWaEne7G3Q69zdFykv7+8kPts/BXLAZbhf4sUtHz3JbFxb1EpWzYHKTTGcqLOahhZWpRE77ayNOtjkFhvhZubK7JLwA/0XPnbOQxUB355r+4l1EHKdwTLWwmI8WVmooxyLzrHHwjuGAoa9vGcfxPqNqKYgsCw8wN2rswIMyxczRbl7wp7/TJSTW4bGpb0VhJGACXlktUXlUqLQBwAKwDxyG1yKuVoo4cr/kvcFSCw+UcNG/j5RnqsvMjlpfx2C24x4uMt0CH8q5xkssK0D/EI7n8xRWTSmsXAsLOCLk5yiscA/yvKDMX2octHC8re5rR1cKi/k9lID0Emdfn4sizFRYdSqsdPmCYTYp76p+F5Eew/llDhR3cLSZwSqpJqAnRggVarCX/wtfI8Aq4Puhrr86TNA984u99fB3ugyrrDMeYHldYVc/VG9lhuNiUXLSQRT1SA944P6gM+v1J5V9IRK3kDIiNyNIwL/WwW2wD2wFrwbE+9ICKAMXF+YHo1+pPM7TusxUWCpPtoWFjq2u7fskhQs5XwpmyjwnwGqWNlzl/xeC2H3ktMM2lJWvBl2iO95OswalzZQV/DQT20T8HOX/hevZzXZ8J4p940xyZAkbVUsy+oCf82HcB29RnfiADycA/4AXIUOOcwkp5xEBzXcjrrujPHikD+J4m/ma4CsJ14SATYzKNNeJZVQ96SAWQZt13gsY+Vw6LKIDwM6XcWVr4jJDgYoMtudQxuzYW07RD+IeHtI9knPDaYOLcnFOdkJa2HkLzBJmuFF/qpikyRR3cE5ZhIPq3LDgUiw7h3vjOVJOO6jVEC/lf77D+yAzrlSzZgnjSv4zhbV9DRYo5UPik2gPmxncEHJhA2GL5u5UHEcC+9iSBnh7hhw8vM4LQlO8EeMmLYYm8t7niL0pwdqRjufrXQUf3YB2uKQ67EwvLiiuXXf+W+Xc9FAH8b4Ef5AENqt6PhDLiffh2+1YkkUNvspO1pAI/K4VFuSpPGlWy2bwNz5f4FzipJCQPUrWnfh5PgMqm5jlktMOSsYXKi7sHvj9RNAdLDKy63AzhrRKo74AvuHjCaN4RaPqiQGKVDIeqNVLSsJvVGDhifQORgwrPwq6FQH7LmByh3SylCUOCzj66O1PNsDCuiLWDBXq9Z4DcOnOgm+WlMH2DJXCyrcsArjXCuyeTSgjeNWCVzq0/njNhQJHZVJhr7AbrMIxrkb4A/+tMV8TfDYxfq1OpVYPxYX9PCHPOLjFe5uWMkUsLL5HYtHf94qP4RXJFlaOwuKM4REwMc7wKt1vaWcsibKZwY1yB1uMq5lLybMX3CaAfAecIosKi6OqWBY4zgjXOsffBAyNRk24X0gvBm5d4aZ4p4K8BcraMIWFutYVFtqjvCwqLHaU2bIKK2CYCNqeCit1dky7Qpvwu8G2ewMeiFmvh6gIBB87ouorBroDe0SdS8JcdrQG1ktzlpG+CE4KVxnyAyXj/XYmvE/b5P3wykSHJ+S1Q9y1Bq90Zk/D4QKzhAmByeGi5Ff3+wr8cZ9RtVRzwPZFxkFxGj+cwEOYkKNO4/wywdY1HEfSFZaKw6qHQxnBmcfBy2q0/lyPoKhjK2Q98CMj+LO+iklwCXU9MmL299C2pxXW81vJMIsxdgbphGJBjCTUw44ac4UcUN3m/5/Gyvzg/mfog1Ky8n/EqS5heMznYb06TQ7FjZVlU6NpVhHyfFKDpc2yT/i+xVkwoweMRZP37rgv32U76OVRN3iuDf42EXRnHFYeiTXoLSuws1Lts/TVk4C4eNDz7KBUDPD3645j6bayGM4GCG7MDGvImSXkkpZTKLPCTr2oR1AXS4Op7U4U8pcboLBOyIwV20Mswfd7sFwPU450hEec6i4sA+V8HNpDgtKxPMmWBfLvF0uW1smPMptF62obwXAfKrFJlSkY1hAuuODYxhm6gieRHkN9w6Ikcp79jKqr1XnfwlWdFvgAnIxz5beDPr9drE0+kyby7CpjYfE9lzixJ+r6bc3gBimsg+szgK6jtrgYuZWY9hiUdGYNXmoXpkAcFvIOebCUdYzFXuprTpbDCDbAPT7EJS6RmxLkxf/kB9F6HOc5fu8sLqNxLlDAvSjxrrEbuIF+IS4V1DBlTogiiP5X7V0CwyqPzWH/MFyHd1nbDg9ynJJuK4x1awEMKz4gXaRMyfcjeIABvl4BU2Hlk8cAyXv7jDbEJZzhkhcfuDkpLMBkYhqYA/PKDN++tFnCmlr8XOTBi7sRc4km1AzOG5zvr1SBu8DLhuqQh3tQfsOQt6hm6yZKyLijXNSptF0KlGsSx25q0Tl1L+KqMe+zpImC9fx5LiEB+5LKfJIYpsdEJ3N4Fkz3NjxTqB3iM88SHlL3MINrE0IdXbuEbKsFtgM4NIVVvbIKd8iUth+BkR7pokOfUsrl2ySrApy3NEe/ZAPI99jHK6Hs4YRdRZtqHddEUNXSHAargm+r+Klb4P6yGyGCb1CO8M/FysvzCdfU/li7MrCbRMtCdjUFe4txJsIF8Zudn0uFilpYYc8WFreh8eD8aBf594NfeTwQ1/5+kXaIh2Wodv0DvEUNikUUlllYG0kSnhB09lCaxgN/p8sZxSWa8k/w4LV5ziC6TqQ75OYprL0q/xr4w4Q8t9XLLTJHKm6XCXBbRf0fxUtdVta/JRBVxRJ9lBtASncOdV6vKRc8C7tRkdpxhbXF7+eE9H9x/Ir5XoM/7klhlbGwiCUp66qRDVbrbXfW3dsV8GheO+TuxoF83LLoS3nOLNu9wjKXcGMJD+qeGin3dznq94t5ztGoiXJH4hYW5OZhWDp48SbKMLI8TASVpZND1hLzCNe5ZKYS4t7zdwmWe1f0Y04yFCbIcdH6YMhpCBjehWV2lnE+Uk4siwNZ0/lg5EsFm88xHEXkrTI9Bx5IsJDPOzlgpFOs0GPMU1hhEZf8imXb4K8LuJGnWS+4cblIOyQGrNYdJst36w1x0kIYFusyhVU1EV9Z4/Ylz9NGuSzQlQDnbJpLSPxmFDziOOQx2vd9HOdv09WBrGgG8iTdvaRtb6ZqTkHyRQ+furCIcKcz6cP3cM5/hGAHeAz/TxGgLYpjRS+03iaaVuUVKs9BV1cYMWfE/oV7OhEkWC0MqnzCgcGD+VOBs1a3eDmi3KOlI84NXWH+Jn6fS9+Ejq5QCtjM87vdLJwO3CUelqCwVJ6/HXTHfWyF3Ae+TeM4aJ6SQfnXxPMWpe2KtEMsr7j+15HfA/B+zy4D3f9pJGupuJWwj7e5UtAye0+Z0MvS2ZJmCbmy/U8qrkWUA+NYD58FjF5Wa9lm/LR7xlKPi76cn9UUWaj/PmctfxNshAGETb8YuAcL9FOUfyFyKEv4Dfgh60KdoRwf4/crcIZVEh5E3mdeDo/4Hd6nHOG5APJVnpYOusyfzuf9Jtc/zzxgeXYEiTNB97R7KQ+6Q+Z+/2wYYzdQaCtnrC1lvSsoP160HTTJgAEZz9S9FHIJXUiHfxdNYVVGMjJ1lipE7sZYCTdnRo0up+KR2fw/lzlKiWXVXwBfWnC4kI+2hqyENKP3t/f1QLTgfoKs1cy6mBZ3J0PWCGOP3nQhR+K2UoMki1oW3Eiw7RfogpUS3LiwBr9BJPmLUnFyHbdvtqyFpdcZurg7yixrYdksYXXEJS9XA9mGth4FCg6UkDFGUFhkHPcuJWSOgC/L/5Q//f/p8Puac4kO4Fjo+4FcyzXIpRY3+JGLR+DHtHQeSodEuoa8+4Jeo49p3REsvxC4KfgF1vWYylMCTK+hvnFxSfM25WN81teUNU85wg8kwJNyhgp8V+8CeJo8mJJnJxc7T7Pt0jrhuJcl6ZQ8o+t5MNgU+3xco8ay11B2uOS3KKfJl7PaoYC8S6rchQLK85xqq+E+I6MuZmo2cc/trQHwEe1iVLnnO+sCHoN0D2EW3G7HybKlHUZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRmXof7gY6Sur0UH+AAAAAElFTkSuQmCC`;
        // console.log(imgData);

        doc.addImage(imageData, 'JPEG', 15, 15, 30, 30);
        console.log(
            'Insideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee12333333333333333333333333'
        );
        // Add company information
        doc.setFontSize(12);
        doc.text(props.data.senderDetails.name, 60, 25);
        doc.text(props.data.senderDetails.address, 60, 32);
        doc.text(props.data.senderDetails.phoneNumber, 60, 39);
        console.log(props.data.senderDetails.email);
        doc.text(props.data.senderDetails.email, 60, 46);

        // Add invoice number and date
        doc.setFontSize(16);
        doc.text('INVOICE', 140, 25);
        doc.setFontSize(12);
        doc.text('Invoice #: 1234', 140, 35);
        doc.text('Date: 03/25/2023', 140, 42);

        // Add customer information
        doc.setFontSize(12);
        doc.text('Bill To:', 15, 70);
        doc.text(props.data.receiverDetails.name, 15, 77);
        doc.text(props.data.receiverDetails.address, 15, 84);
        doc.text(props.data.receiverDetails.phoneNumber, 15, 91);
        doc.text(props.data.receiverDetails.email, 15, 98);

        // Add table header
        doc.setFillColor(240);
        doc.rect(15, 110, 180, 10, 'F');
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text('SlNo.', 20, 116);
        doc.text('Item', 60, 116);
        doc.text('Quantity', 120, 116);
        doc.text('Price', 160, 116);
        doc.line(15, 118, 195, 118);

        // Add table rows
        doc.setFontSize(10);
        // console.log(props.data.items[index].name)
        for (let index = 0; index < props.data.items.length; index++) {
            let y = 125 + 7 * index;
            doc.text(String(index + 1), 20, y);
            doc.text(props.data.items[index].name, 60, y);
            doc.text(props.data.items[index].price, 120, y);
            doc.text(props.data.items[index].qty, 160, y);
        }

        // doc.text('2', 20, 132);
        // doc.text('Item 2', 60, 132);
        // doc.text('1', 120, 132);
        // doc.text('$5.00', 160, 132);

        // Add table footer
        doc.setDrawColor(0);
        doc.line(15, 160, 195, 160);
        doc.text('Subtotal:', 120, 167);
        doc.text(String(props.data.subTotal), 160, 167);

        let discountPercentage = Number(props.data.discount);
        let taxPercentage = Number(props.data.tax / 100);
        let subTotal = Number(props.data.subTotal);
        let discount = (discountPercentage / 100) * subTotal;
        let discountedTotal = subTotal - discount;

        console.log('discount is ', discount);
        doc.text('Discount:', 120, 174)
        doc.text(String(discount), 160, 174);

        let tax = discountedTotal * taxPercentage;
        doc.text('Tax:', 120, 181);
        doc.text(String(tax), 160, 181);
        doc.text('Total:', 120, 188);
        doc.text(String(props.data.total), 160, 188);

        doc.save('invoice.pdf');
    };

    return (
        <div>
            <button onClick={downloadPDF}>Download PDF</button>
            <div ref={pdfRef} />
        </div>
    );
};

export default InvoiceTemplate;
