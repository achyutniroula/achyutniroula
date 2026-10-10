// Long-form "explain it from zero" content for each insurance product, written in
// the same shape as the Universal Life playbook: a from-zero primer, how the
// cost or guarantee is structured, what sits inside the product, the Canadian
// tax rules, and how it compares with the alternatives.
//
// ACHYUT: tax rules and figures here are summarized for education, not tax advice.
// Check each rule against the current Income Tax Act / carrier documents before
// this goes live, same as the walkthroughs in insuranceServices.ts.

export interface Lead {
  lead: string;
  text: string;
}

export interface DeepDiveTable {
  headers: string[];
  rows: string[][];
}

export interface ProductDeepDive {
  // Aesthetic photo shown as a banner at the top of the page (public/images/insurance/{slug}.webp).
  photo: {
    heading: string;
    caption: string;
  };
  fromZero: {
    heading: string;
    intro: string[];
    splitHeading: string;
    split: Lead[];
    likes: string[];
    bites: string[];
    keyQuestion: Lead;
    plainTerms: string;
  };
  structures: {
    heading: string;
    intro: string;
    table: DeepDiveTable;
    forYou: Lead;
    otherTerms: Lead[];
  };
  inside: {
    heading: string;
    intro: string;
    table: DeepDiveTable;
    keyPoints: Lead[];
    rule: Lead;
  };
  tax: {
    heading: string;
    intro: string;
    rules: Lead[];
  };
  alternatives: {
    heading: string;
    intro: string;
    table: DeepDiveTable;
    quickTakes: string[];
    honest: Lead;
  };
}

export const insuranceDeepDives: Record<string, ProductDeepDive> = {
  // ───────────────────────────── Segregated funds ─────────────────────────────
  'segregated-funds': {
    photo: {
      heading: 'Growth you can sleep on',
      caption:
        'A quiet desk, a notebook and a long view of the markets. Segregated funds are built for people who want to invest for decades without losing sleep over a bad quarter.',
    },
    fromZero: {
      heading: 'Segregated funds from zero',
      intro: [
        'A segregated fund (seg fund) is an investment fund wrapped inside an insurance contract. You own units of a fund that holds stocks and bonds, and the insurance company adds a promise on top: a minimum amount you or your beneficiary will get back at a set date or at death.',
        'The “segregated” part means your money is kept separate from the insurer’s own assets. If the insurance company has trouble, your fund assets are not mixed in with its general funds.',
      ],
      splitHeading: 'Every deposit does three jobs:',
      split: [
        { lead: 'Buys fund units', text: 'your deposit is invested in the underlying fund you choose, from money market to equity.' },
        { lead: 'Pays for the guarantee', text: 'a slice of the fund’s yearly fee (the MER) is the insurance premium for the maturity and death guarantees.' },
        { lead: 'Sets your floor', text: 'the guarantee is a percentage of your deposits, usually 75% to 100%, protected no matter what the market does.' },
      ],
      likes: [
        'A contractual floor under your principal',
        'Annual resets that lock in gains (usually until age 80)',
        'Named beneficiary, so proceeds can skip probate',
        'Potential creditor protection for the right owner and beneficiary',
      ],
      bites: [
        'Fees are higher than a comparable mutual fund or ETF',
        'Withdrawals shrink the guarantee, sometimes more than the dollars you take out',
        'The guarantee only pays at maturity or death, not whenever the market dips',
        'Resets can restart the maturity clock',
      ],
      keyQuestion: {
        lead: 'The two numbers to always ask about:',
        text: 'the guarantee percentage at maturity versus at death, and the all-in MER at that guarantee level. The gap between a 75% and a 100% guarantee is the price tag on your sleep.',
      },
      plainTerms:
        '“You are buying a normal investment fund, plus insurance that says you cannot get back less than a set percentage of what you put in. You pay a higher yearly fee for that promise, and you can raise the promise when markets go up.”',
    },
    structures: {
      heading: 'Guarantee structures',
      intro: 'How the guarantee is set is the biggest design choice in a seg fund, and it drives the fee. Most Canadian contracts offer some mix of these.',
      table: {
        headers: ['Structure', 'How it works', 'Pros', 'Cons'],
        rows: [
          ['75 / 75', '75% of deposits guaranteed at maturity and at death', 'Lowest fee of the three', 'Smallest safety net, a 25% loss is still possible'],
          ['75 / 100 (estate-style)', '75% at maturity, 100% at death', 'Full protection for the estate, cheaper than 100/100', 'Maturity floor is lower than the death floor'],
          ['100 / 100', '100% of deposits guaranteed at both maturity and death', 'Strongest protection, the most calming for cautious investors', 'Highest fee, which drags returns in long bull markets'],
        ],
      },
      forYou: {
        lead: 'What it means for you:',
        text: 'the further out your maturity date, the more time the market has to beat the guarantee, so a lower guarantee level can be reasonable for a 25-year horizon. A short horizon or a heavy fear of loss points to the higher guarantee. Ask for the same illustration at each level and compare the MER and the floor side by side.',
      },
      otherTerms: [
        { lead: 'Reset:', text: 'a request, usually once a year, to lock in a higher guaranteed value. It can push out your maturity date, so check the new date first.' },
        { lead: 'Maturity date:', text: 'the date the maturity guarantee applies, often 10 to 15 years after a deposit and extendable by reset.' },
        { lead: 'Proportional withdrawals:', text: 'taking out 10% of the market value reduces the guarantee by 10%, not by 10% of the dollars, which matters when markets are down.' },
        { lead: 'Deposit-based guarantee:', text: 'the guarantee is tied to what you deposited, net of withdrawals, not to the market value on a given day.' },
        { lead: 'Underwriting:', text: 'light, since the contract insures your investment and not your health. Large deposits can trigger source-of-funds questions.' },
      ],
    },
    inside: {
      heading: 'Funds inside the contract',
      intro: 'The investment side is where seg fund contracts differ most, and where the fee shows up. Insurers typically offer a mix of these.',
      table: {
        headers: ['Fund type', 'What it does', 'Risk', 'What to check'],
        rows: [
          ['Money market / short-term income', 'Holds cash-like and short-term bonds', 'Low, but returns can trail inflation', 'MER versus yield, since a high fee can wipe out the return'],
          ['Fixed income / bond', 'Pays interest from government and corporate bonds', 'Low to medium, rate moves change the price', 'Duration, credit quality, MER'],
          ['Balanced / asset allocation', 'A set mix of stocks and bonds, rebalanced for you', 'Medium', 'Stock-to-bond mix, rebalancing rules, MER'],
          ['Equity (Canadian, US, global)', 'Holds company shares for long-term growth', 'Medium to high, can lose value', 'Where it invests, manager track record, MER'],
        ],
      },
      keyPoints: [
        { lead: 'MER is the all-in fee.', text: 'It includes fund management and the cost of the guarantee. A 1% difference compounded over 25 years is large.' },
        { lead: 'Illustrations assume a return.', text: 'A brochure may show 5% or 6%. That is an assumption. Look at the guaranteed floor and a flat-market scenario too.' },
        { lead: 'Switching is usually free.', text: 'Moving between funds inside the contract keeps your guarantee in place. Outside a registered plan, a switch can still be a taxable sale.' },
        { lead: 'Match fund to horizon.', text: 'A longer runway can defend more equity, but the owner still needs to be comfortable with the swings along the way.' },
        { lead: 'Seg funds are sold under an insurance licence.', text: 'They look like mutual funds but are insurance contracts, so the guarantee is a contract term, not a market outcome.' },
      ],
      rule: {
        lead: 'Rule of thumb for comparison shopping:',
        text: 'pick the same fund type and the same guarantee level for every illustration, then compare MER and the floor so the comparison is fair.',
      },
    },
    tax: {
      heading: 'Canadian tax rules',
      intro: 'Seg funds are taxed differently from mutual funds in a few important ways. These are the core ideas. Confirm details with the carrier or an accountant before committing.',
      rules: [
        { lead: 'Income flows through to you.', text: 'In a non-registered contract, the fund’s interest, dividends and capital gains are allocated to you each year and taxed, even if they are reinvested.' },
        { lead: 'Registered contracts shelter growth.', text: 'Held inside an RRSP, RRIF or TFSA, the same rules as that account apply, so there is no yearly tax on allocations.' },
        { lead: 'Switching and withdrawing can trigger gains.', text: 'In a non-registered contract, switching funds or withdrawing is treated as a sale, so you can realize a gain or a loss. Track the adjusted cost base.' },
        { lead: 'Guarantee top-ups at death or maturity.', text: 'If the guarantee pays more than the market value, the extra is generally treated as a taxable gain to the contract holder. Ask the carrier how it will be reported.' },
        { lead: 'Probate bypass.', text: 'With a named beneficiary, proceeds generally go outside the estate and skip probate fees. In Ontario that can save about 1.5% of the estate above $50,000. Quebec treats beneficiary designations differently.' },
        { lead: 'Creditor protection.', text: 'A beneficiary in the protected family class (spouse, child, grandchild or parent) may shield the contract from the owner’s creditors. It is potential, not automatic, and timing matters.' },
        { lead: 'Fees are not deductible.', text: 'In most personal contracts, the MER is built into the fund price rather than billed separately, so there is no separate deduction.' },
      ],
    },
    alternatives: {
      heading: 'How seg funds compare with the alternatives',
      intro: 'If a seg fund is not the best answer for your goal, say so. It builds trust.',
      table: {
        headers: ['Option', 'Guarantees', 'Cost', 'Estate / creditor features', 'Best for'],
        rows: [
          ['Segregated fund', '75% to 100% of deposits', 'Higher MER', 'Probate bypass, potential creditor protection', 'Market exposure with a floor and an estate plan'],
          ['Mutual fund / ETF', 'None', 'Low to medium', 'Goes through the estate', 'Low-cost growth you can afford to risk'],
          ['GIC', 'Principal and stated interest (CDIC-eligible)', 'None built in', 'Goes through the estate unless registered', 'Short horizon, zero market risk'],
          ['Whole or universal life', 'Depends on product', 'Cost of insurance plus fees', 'Tax-free death benefit', 'Permanent insurance need with savings on the side'],
        ],
      },
      quickTakes: [
        'If you want growth with a floor and a simple estate plan, a seg fund is a candidate.',
        'If the goal is the lowest cost over decades, a mutual fund or ETF usually wins.',
        'If you cannot accept any loss at all, a GIC is the simplest answer.',
        'If creditor protection or probate savings matter, the seg fund wrapper earns its fee.',
      ],
      honest: {
        lead: 'An honest weakness of seg funds:',
        text: 'in a long, steady bull market the guarantee costs you return and never pays out. It pays most in volatile or falling markets, which is the point of buying it.',
      },
    },
  },

  // ───────────────────────────── Whole / Universal life ─────────────────────────────
  'whole-life': {
    photo: {
      heading: 'Protection that outlasts you',
      caption:
        'Generations around one table. Permanent insurance is the plan that is still there when the next generation needs it, built quietly in the background over decades.',
    },
    fromZero: {
      heading: 'Whole and universal life from zero',
      intro: [
        'Permanent life insurance lasts as long as you keep it funded, usually to age 100 or beyond. Whole life keeps the pieces bundled with fixed premiums. Universal life (UL) unbundles the insurance and the savings into separate pieces you can see and adjust.',
        'Either way, part of what you pay builds a cash value inside the policy that grows tax sheltered, on top of the death benefit paid to your beneficiaries.',
      ],
      splitHeading: 'Every payment you make is split three ways:',
      split: [
        { lead: 'Cost of insurance (COI)', text: 'the monthly price of the death benefit, based on age, sex, health class and smoker status.' },
        { lead: 'Charges', text: 'policy fees, admin charges, premium tax pass-throughs and fund management fees (MERs).' },
        { lead: 'Savings', text: 'whatever is left goes into an investment account inside the policy, called the cash value or account value.' },
      ],
      likes: [
        'Coverage that does not expire',
        'Flexible premiums on UL, within a minimum and a maximum',
        'Tax-sheltered growth inside a policy that stays “exempt”',
        'Cash value you can borrow against or withdraw from',
      ],
      bites: [
        'UL cash value depends on returns and charges, so it is not guaranteed like whole life',
        'If you underfund a UL, the COI eats the account and the policy can lapse',
        'Illustrations assume a return, and real returns vary',
        'Surrender charges make cancelling in the early years expensive',
      ],
      keyQuestion: {
        lead: 'The two numbers to always ask about:',
        text: 'the minimum premium needed to keep the policy alive to age 100 using guaranteed assumptions, and the premium that works under the illustrated assumption. The gap between them is the risk you are taking.',
      },
      plainTerms:
        '“You are buying a lifetime insurance policy. You put money in on a schedule. Part pays for the coverage, the rest builds a tax-sheltered account. The younger you start, the cheaper the coverage and the longer the savings compound.”',
    },
    structures: {
      heading: 'Cost of insurance structures',
      intro: 'How the COI is charged is the biggest design choice in a UL, and it matters more the longer the policy has to run.',
      table: {
        headers: ['Structure', 'How it works', 'Pros', 'Cons'],
        rows: [
          ['Yearly renewable (YRT / increasing COI)', 'COI is recalculated every year and rises with age', 'Cheapest in the early years, more of each payment goes to savings', 'Costs climb steeply in later decades and can squeeze late-life cash value'],
          ['Level COI', 'COI is fixed (often to age 100 or a set age) based on issue age', 'Predictable and strong for long horizons', 'Higher charges in early years than YRT, so slightly less early cash value'],
          ['Hybrid / uniform', 'The insurer averages the cost over a period, or lets you pick', 'A middle ground', 'Product specific, read the fine print'],
        ],
      },
      forYou: {
        lead: 'What it means for you:',
        text: 'a level COI locks in a price based on your age at issue, which is usually the better match for a policy meant to last a lifetime. YRT can look great in year 10 and painful in year 40. Ask each carrier for both and compare the 30-year and age-65 values.',
      },
      otherTerms: [
        { lead: 'Death benefit options:', text: 'Level (benefit stays at the face amount) versus Level plus account value (benefit grows with the account). Level costs less.' },
        { lead: 'Pay period:', text: '10 pay, 20 pay, pay to 65, or pay to 100. Shorter pay means higher payments and a policy funded early.' },
        { lead: 'Guaranteed vs non-guaranteed COI:', text: 'carriers list a current rate and a guaranteed maximum rate. Compare both.' },
        { lead: 'Minimum vs maximum premium:', text: 'the minimum keeps coverage alive, and the maximum is set by the tax exempt test.' },
        { lead: 'Whole life premiums:', text: 'fixed for life, with a guaranteed cash value schedule and, on participating policies, possible dividends that are not guaranteed.' },
      ],
    },
    inside: {
      heading: 'Investment accounts inside the policy',
      intro: 'The savings side is where UL products differ the most, and where most illustrations get sold or lost. Carriers typically offer some mix of these.',
      table: {
        headers: ['Account type', 'What it does', 'Risk', 'What to check'],
        rows: [
          ['Daily interest / GIA', 'Credits a stated interest rate, short or fixed term (1 to 10 years)', 'Low, but the rate resets, so long-term returns follow interest rates', 'Current rate, guaranteed minimum, renewal rate history'],
          ['Indexed account', 'Tracks an index (often Canadian or US equity) with a cap or participation rate and a floor near zero', 'Medium, you give up upside for protection', 'Cap, participation rate, how often they can change it'],
          ['Managed / segregated-style funds', 'Mutual-fund-like options: equity, balanced, fixed income', 'Market risk, can lose value', 'MER, fund choices, switching rules'],
          ['Participating dividend scale (whole life)', 'Insurer shares its investment and claims experience through annual dividends', 'Dividends are not guaranteed', 'Dividend scale history, how the dividend is used'],
        ],
      },
      keyPoints: [
        { lead: 'Illustrated rate versus real life.', text: 'The brochure may show 5% or 6%. That is an assumption. Always look at the guaranteed or lower return scenario too.' },
        { lead: 'Fees stack.', text: 'COI plus policy fee plus fund MER plus any premium tax charge. Over 40 years a 1% fee difference is large.' },
        { lead: 'Switching and rebalancing.', text: 'Moving between accounts is usually free and not taxable inside the policy, which is a real planning advantage.' },
        { lead: 'Sequence and timing.', text: 'A long runway makes equity-heavy accounts more defensible, but you still need to be comfortable with swings.' },
        { lead: 'Not a securities product in Canada.', text: 'UL is sold under a life insurance licence, not a securities licence, but the accounts can feel like funds. Returns are not guaranteed unless a guaranteed account is chosen.' },
      ],
      rule: {
        lead: 'Rule of thumb for comparison shopping:',
        text: 'decide the account you will use in every illustration (for example the carrier’s daily interest or its balanced fund) and use the same assumed return across carriers.',
      },
    },
    tax: {
      heading: 'Canadian tax rules',
      intro: 'The tax treatment is the main reason to use permanent insurance at all. The exact rules sit in the Income Tax Act and its regulations, so have the carrier’s tax illustration or an accountant confirm the details.',
      rules: [
        { lead: 'Tax-sheltered growth (the exempt test).', text: 'Growth inside a policy is not taxed each year as long as the policy passes the exempt test. The test caps how much you can put in relative to the death benefit, and rules tightened in 2017. Carriers build in a limit, often called the MTAR.' },
        { lead: 'Tax-free death benefit.', text: 'The death benefit paid to a beneficiary is not taxable income.' },
        { lead: 'Adjusted cost basis (ACB).', text: 'ACB roughly tracks what you have paid in, less the net cost of pure insurance. Withdrawals and policy loans above ACB are taxable, so the lower the ACB relative to the cash value, the more tax on a withdrawal.' },
        { lead: 'Withdrawals and loans.', text: 'Withdrawals can create taxable income to the extent they exceed ACB. A policy loan is treated as a partial disposition and can also be taxable. A bank loan secured by the policy (a collateral loan) is not a disposition and is not taxed.' },
        { lead: 'Corporate ownership and the CDA.', text: 'When a corporation owns the policy, the death benefit less ACB is credited to its Capital Dividend Account and can be paid to shareholders tax free. This is a major reason business owners use permanent insurance.' },
        { lead: 'Creditor protection.', text: 'A policy with an eligible family-class beneficiary (spouse, child, grandchild or parent) is generally protected from the owner’s creditors in provinces such as Ontario. Do not promise it without checking the facts.' },
        { lead: 'Premiums and taxes.', text: 'Premiums are generally not deductible, and some products pass a premium tax percentage through to the policy.' },
        { lead: 'Ownership at death.', text: 'If the owner dies, the policy goes by the successor owner designation if there is one. Without it, it falls into the estate and may face delay and probate. Name a successor on day one.' },
      ],
    },
    alternatives: {
      heading: 'How permanent insurance compares with the alternatives',
      intro: 'Be ready to compare it with the other ways to do the same job. If permanent insurance is not the best answer, say so.',
      table: {
        headers: ['Option', 'Guarantees', 'Flexibility', 'Tax shelter', 'Best for'],
        rows: [
          ['Universal life', 'Low to medium, depends on account and funding', 'High', 'Yes (exempt policy)', 'Flexible funding, long horizon, comfortable with some risk'],
          ['Participating whole life', 'High (guaranteed values plus non-guaranteed dividends)', 'Low to medium', 'Yes', 'Guaranteed, low-maintenance legacy and wealth transfer'],
          ['Term to 100 / non-par whole life', 'High', 'Low', 'Little cash value', 'Cheapest lifetime death benefit, no savings'],
          ['Term insurance', 'Fixed term', 'Low', 'None', 'Temporary cover, cheap, convertible'],
          ['RRSP / TFSA', 'None, market based', 'High to very high', 'Yes, but with contribution room limits', 'Retirement and tax-free savings'],
        ],
      },
      quickTakes: [
        'If you want a lifetime death benefit with growth that skips yearly tax, UL, par whole life and term to 100 are all candidates.',
        'If you want guarantees and a hands-off policy, par whole life is typically simplest to explain and defend.',
        'If you want control over investments and the ability to adjust, UL fits better than whole life.',
        'If the need is temporary, term is cheaper and you can convert later.',
      ],
      honest: {
        lead: 'An honest weakness of UL:',
        text: 'it is sensitive to long-term interest rates and investment performance, and it needs periodic reviews. Par whole life has the carrier smoothing results for you. A good answer is to illustrate both and show the guaranteed columns.',
      },
    },
  },

  // ───────────────────────────── Critical illness ─────────────────────────────
  'critical-illness': {
    photo: {
      heading: 'A cushion while you recover',
      caption:
        'A bright, calm hospital corridor. Critical illness cover is built for the weeks after a diagnosis, when the last thing you should be doing is worrying about money.',
    },
    fromZero: {
      heading: 'Critical illness insurance from zero',
      intro: [
        'Critical illness (CI) insurance pays you a one-time, tax-free lump sum if you are diagnosed with a covered serious illness and survive the waiting period. It is not health insurance, and it does not pay your medical bills. It pays you, and you decide what to do with the money.',
        'It sits between life insurance (paid after you die) and disability insurance (paid monthly while you cannot work). CI pays early, in a lump sum, on diagnosis.',
      ],
      splitHeading: 'Every premium you pay is split three ways:',
      split: [
        { lead: 'Cost of the risk', text: 'the price of the chance you are diagnosed with a covered illness, based on age, sex, health and smoker status.' },
        { lead: 'Charges', text: 'policy admin costs and the insurer’s margin for claims experience.' },
        { lead: 'Optional savings', text: 'on a return-of-premium rider, a slice builds a refund you can get back if you never claim.' },
      ],
      likes: [
        'Cash arrives fast, on diagnosis',
        'You choose how to spend it',
        'Pairs well with disability insurance',
        'Level premiums can be locked in for years',
      ],
      bites: [
        'The diagnosis must meet the exact policy definition',
        'A condition not on the list pays nothing',
        'Pre-existing conditions can be excluded for the first months',
        'On a standard policy, premiums are not returned if you never claim',
      ],
      keyQuestion: {
        lead: 'The two numbers to always ask about:',
        text: 'the number of covered conditions (and whether partial payouts exist for early-stage ones), and the premium both with and without a return-of-premium rider.',
      },
      plainTerms:
        '“You pay a monthly premium. If you are diagnosed with a covered illness and live through the survival period, the insurer sends you a cheque for the full amount. You use it for anything, from specialist travel to replacing your income.”',
    },
    structures: {
      heading: 'Premium and coverage structures',
      intro: 'How the premium is set and how long it lasts is the biggest design choice in a CI policy. It affects both your cost today and what you can keep for life.',
      table: {
        headers: ['Structure', 'How it works', 'Pros', 'Cons'],
        rows: [
          ['Term 10 / Term 20', 'Level premium for 10 or 20 years, then renews at a higher rate', 'Lowest starting cost', 'Renewal premium rises sharply, coverage may end at a set age'],
          ['Term to 65 / Term to 75', 'Premium fixed (or level) to a set age', 'Covers the working years at a predictable price', 'Coverage ends, so no benefit later in life'],
          ['Lifetime (T100)', 'Level premium for life, coverage to age 100', 'Never expires, premium locked in at issue age', 'Highest premium at the start'],
          ['Return of premium (ROP)', 'Refunds some or all premiums if no claim is made, or at a set date', 'You get money back if you stay healthy', 'Premium can be 50% to 100% higher'],
        ],
      },
      forYou: {
        lead: 'What it means for you:',
        text: 'the risk of a critical illness rises with age, so cover that ends at 65 or 75 stops just when claims become more likely. Ask for term and lifetime quotes side by side and compare the cost over 30 years, with and without the ROP.',
      },
      otherTerms: [
        { lead: 'Survival period:', text: 'usually about 30 days you must live past diagnosis before the claim pays.' },
        { lead: 'Partial payouts:', text: 'some policies pay a portion (for example 25%) for early-stage cancers or less severe events, leaving the rest of the benefit in place.' },
        { lead: 'Exclusion period:', text: 'pre-existing or recently treated conditions may be excluded for the first 90 days or two years.' },
        { lead: 'Underwriting class:', text: 'age and smoker status set the class, and a clean history gets the best rate.' },
        { lead: 'Conversion and renewability:', text: 'check whether a term policy can be converted to lifetime cover without new health questions.' },
      ],
    },
    inside: {
      heading: 'What’s covered inside the policy',
      intro: 'CI products differ most in the list of conditions and how each is defined. Insurers typically offer some mix of these tiers.',
      table: {
        headers: ['Coverage tier', 'What it does', 'Risk', 'What to check'],
        rows: [
          ['Core three', 'Cancer, heart attack and stroke at full benefit', 'Narrow list, many other illnesses uncovered', 'Exact medical definitions of each'],
          ['Standard list (about 20 to 25 conditions)', 'Adds bypass surgery, kidney failure, major organ transplant, paralysis and more', 'Some definitions are strict', 'Survival period, exclusions, definitions'],
          ['Broad list with early-stage payouts', 'Pays a partial benefit for early or less severe conditions', 'Costs more, partial payouts may reduce the full benefit', 'How partial payouts affect the remaining benefit'],
          ['Child and spousal add-ons', 'Cover children or a spouse for a smaller sum', 'Smaller benefit and limited list', 'Age limits and conversion rules'],
        ],
      },
      keyPoints: [
        { lead: 'Definitions beat headlines.', text: 'A diagnosis of cancer in a doctor’s office is not the same as meeting the policy’s precise definition of covered cancer.' },
        { lead: 'More conditions cost more.', text: 'A longer list helps, but a policy with fewer, well-defined conditions can still be the right choice for the budget.' },
        { lead: 'Partial payouts can help or hurt.', text: 'They pay out sooner for early illness, but can reduce the benefit left for a later, more serious claim.' },
        { lead: 'Pairs with disability.', text: 'CI pays a lump sum fast, and disability replaces income over time. Many advisors recommend having both.' },
        { lead: 'Not health insurance.', text: 'CI is sold under a life and health licence. It does not replace provincial health coverage, drug plans or a group plan.' },
      ],
      rule: {
        lead: 'Rule of thumb for comparison shopping:',
        text: 'compare the same benefit amount, the same term and the same rider set across carriers, then read the definitions of the top three conditions.',
      },
    },
    tax: {
      heading: 'Canadian tax rules',
      intro: 'CI is usually simple on the tax side, but ownership and rider choices change the picture. Confirm details with the carrier or an accountant.',
      rules: [
        { lead: 'Benefit is generally tax-free.', text: 'A lump sum from a personally owned CI policy is generally not taxable income to you.' },
        { lead: 'Premiums are generally not deductible.', text: 'Personally owned CI premiums are not tax deductible and are not eligible for the medical expense credit.' },
        { lead: 'Return of premium.', text: 'A refund of premiums paid is generally received tax free, because you are getting back after-tax money you already paid. Interest or growth on top may be treated differently, so ask for the carrier’s tax summary.' },
        { lead: 'Employer-paid or group CI.', text: 'If an employer pays the premium for group CI, the premium may be a taxable benefit to the employee. Ask the plan administrator how it is reported.' },
        { lead: 'Corporate ownership.', text: 'A corporation can own a CI policy, but the tax rules on deductibility and on how the benefit is taxed are technical. Get an accountant’s sign-off before using a company to pay.' },
        { lead: 'Creditor and family law.', text: 'CI benefits are generally paid to you directly, so they are not usually protected the way a life policy with a family-class beneficiary can be.' },
        { lead: 'Death before the survival period.', text: 'If you pass away before the survival period ends, there is no CI payout, though life insurance can still pay.' },
      ],
    },
    alternatives: {
      heading: 'How critical illness compares with the alternatives',
      intro: 'Be ready to show CI next to the other ways to cover the same worry. If CI is not the best answer, say so.',
      table: {
        headers: ['Option', 'Pays', 'Trigger', 'Waiting period', 'Best for'],
        rows: [
          ['Critical illness', 'One-time lump sum', 'Diagnosis of a covered illness', 'About 30-day survival period', 'Fast cash for treatment, travel and a buffer'],
          ['Disability insurance', 'Monthly income', 'Cannot work due to illness or injury', '30 to 180 days elimination period', 'Replacing income over time'],
          ['Life insurance', 'Death benefit to beneficiaries', 'Death', 'None', 'Protecting dependants after death'],
          ['Emergency savings', 'Whatever you have saved', 'Any time', 'None', 'Everyday shocks, often too small for a major illness'],
          ['Group CI', 'Lump sum, usually smaller', 'Diagnosis of a covered illness', 'Survival period applies', 'Employer-paid baseline cover'],
        ],
      },
      quickTakes: [
        'If your worry is the cash you need right after a diagnosis, CI is built for it.',
        'If your worry is losing income for months or years, disability insurance fits better.',
        'If you want to get back what you paid if you never claim, price a return-of-premium rider.',
        'If you already have group cover, check how much it pays and whether it ends when you leave the job.',
      ],
      honest: {
        lead: 'An honest weakness of CI:',
        text: 'many serious conditions are not covered, and the ones that are must meet strict definitions. You can be genuinely ill and still not trigger a payout, which is why reading the list matters more than the headline benefit.',
      },
    },
  },

  // ───────────────────────────── Disability ─────────────────────────────
  disability: {
    photo: {
      heading: 'Getting back to the work you love',
      caption:
        'A physiotherapy session, steady and hopeful. Disability insurance is the plan that pays the bills while recovery does its work.',
    },
    fromZero: {
      heading: 'Disability insurance from zero',
      intro: [
        'Disability insurance replaces part of your income if an illness or injury keeps you from working. Your ability to earn is likely your largest asset, and this is the policy that protects it.',
        'It pays a monthly benefit, usually 60% to 80% of your regular income, after a waiting period you choose, for as long as you meet the definition of disabled up to the end of the benefit period.',
      ],
      splitHeading: 'Every premium you pay is split three ways:',
      split: [
        { lead: 'Cost of the risk', text: 'the price of the chance you become disabled, driven by your occupation, age, sex, health and income.' },
        { lead: 'Charges', text: 'admin costs, claims handling and the insurer’s margin.' },
        { lead: 'Optional features', text: 'riders such as cost-of-living adjustments or future insurability add to the price.' },
      ],
      likes: [
        'Income replacement when you cannot work',
        'You choose the waiting and benefit periods',
        'Benefits tax-free if you pay the premiums yourself',
        'Own-occupation definitions for specialists',
      ],
      bites: [
        'Benefits do not start for 30 to 180 days',
        'Definitions of disability vary and can tighten after a few years on claim',
        'Self-employed income can be harder to document',
        'Premiums are not returned if you never claim',
      ],
      keyQuestion: {
        lead: 'The two numbers to always ask about:',
        text: 'the definition of disability and when it changes (for example own occupation for two years, then any occupation), and the elimination period you can comfortably cover from savings.',
      },
      plainTerms:
        '“You pay a premium to protect your paycheque. If you cannot work because of illness or injury, after the waiting period you receive a monthly benefit until you recover or the benefit period ends.”',
    },
    structures: {
      heading: 'How disability cover is structured',
      intro: 'Three design choices set both the price and how the policy behaves at claim time: the definition of disability, the benefit period and the elimination period.',
      table: {
        headers: ['Structure', 'How it works', 'Pros', 'Cons'],
        rows: [
          ['Own occupation', 'Pays if you cannot do your specific job, even if you could do other work', 'Strongest protection, ideal for specialists', 'Highest premium'],
          ['Any occupation', 'Pays only if you cannot work in any job you are reasonably suited for', 'Lower premium', 'Harder to qualify for a claim'],
          ['Blended (own then any)', 'Own-occupation test for an initial period, then switches to any occupation', 'A middle price', 'Protection weakens partway through a long claim'],
          ['Residual / partial benefit', 'Pays a proportional benefit if you return to work at reduced income', 'Smooth transition back to work', 'Needs clear income documentation'],
        ],
      },
      forYou: {
        lead: 'What it means for you:',
        text: 'if your income depends on a specialized skill, own occupation is worth the extra cost. If you could readily retrain, any-occupation may be enough. Ask each carrier when and how the definition changes on claim.',
      },
      otherTerms: [
        { lead: 'Elimination period:', text: 'the wait before benefits start, commonly 30, 60, 90 or 180 days. A longer wait lowers the premium.' },
        { lead: 'Benefit period:', text: 'how long benefits last, from 2 or 5 years up to age 65. Longer costs more.' },
        { lead: 'Non-cancellable vs guaranteed renewable:', text: 'non-cancellable locks in your premium and terms. Guaranteed renewable keeps the cover but allows rate changes for the whole class.' },
        { lead: 'Cost-of-living rider:', text: 'increases your benefit with inflation once you are on claim.' },
        { lead: 'Future insurability rider:', text: 'lets you buy more cover as your income grows, without new medical questions.' },
      ],
    },
    inside: {
      heading: 'Riders and options inside the policy',
      intro: 'Riders are add-ons. The base policy sets the floor, and a few riders do a lot of the work. Insurers typically offer some mix of these.',
      table: {
        headers: ['Rider / option', 'What it does', 'Risk or cost', 'What to check'],
        rows: [
          ['Cost-of-living adjustment', 'Raises your benefit with inflation while on claim', 'Adds to the premium', 'Cap on the increase and how it is calculated'],
          ['Future insurability', 'Lets you increase benefits as income grows without new health questions', 'Adds to the premium', 'Age limits and how often you can use it'],
          ['Residual / partial disability', 'Pays a proportional benefit when you work part-time', 'Needs clear income records', 'How lost income is measured'],
          ['Return of premium', 'Refunds some premium if you do not claim', 'Premium can be much higher', 'Refund schedule and claim deductions'],
          ['Own-occupation upgrade', 'Extends the own-occupation definition for longer', 'Costs more', 'Exact length of the own-occupation period'],
        ],
      },
      keyPoints: [
        { lead: 'Group plans often fall short.', text: 'They commonly replace about 60% to 66% of income, are usually taxable if your employer paid, and end when you leave the job.' },
        { lead: 'Underwriting looks at your job.', text: 'A desk worker and a tradesperson are priced very differently. Be accurate about duties.' },
        { lead: 'Mental health and chronic pain.', text: 'Some contracts limit benefit duration for these. Ask directly.' },
        { lead: 'Savings cover months, not years.', text: 'A disability lasting years can exhaust an emergency fund quickly.' },
        { lead: 'Government support is modest.', text: 'EI sickness benefits are limited in duration, and CPP disability has strict rules and takes time to approve. Do not count on either to replace your income.' },
      ],
      rule: {
        lead: 'Rule of thumb for comparison shopping:',
        text: 'quote the same benefit amount, elimination period, benefit period and definition across carriers, then compare riders one at a time.',
      },
    },
    tax: {
      heading: 'Canadian tax rules',
      intro: 'Who pays the premium decides whether the benefit is taxed. That is the single most important disability tax rule.',
      rules: [
        { lead: 'You pay, benefit is tax-free.', text: 'If you pay the premiums yourself with after-tax dollars, the monthly benefit is generally not taxable.' },
        { lead: 'Employer pays, benefit is taxable.', text: 'If your employer pays the premiums, the benefit you receive is generally taxable income.' },
        { lead: 'Premiums are generally not deductible.', text: 'For a personally owned policy, premiums are not a tax deduction. That is the trade-off for a tax-free benefit.' },
        { lead: 'Employee-paid group coverage.', text: 'If employees pay the group premiums themselves, the benefit is generally tax free. If the employer pays, it is taxable.' },
        { lead: 'Business overhead expense.', text: 'Premiums for business overhead expense (BOE) cover are generally deductible to the business, and the benefit is taxable. It is a separate product from personal disability.' },
        { lead: 'Self-employed and incorporated owners.', text: 'Who owns the policy and who pays the premium matter. A corporation paying a personal disability premium can create a taxable benefit, so confirm the structure with an accountant.' },
        { lead: 'Government benefits.', text: 'EI sickness and CPP disability are taxable and may be reduced or offset by private benefits, depending on the plan wording.' },
      ],
    },
    alternatives: {
      heading: 'How disability insurance compares with the alternatives',
      intro: 'Be ready to show disability insurance next to other ways to cover the same risk. If it is not the best answer, say so.',
      table: {
        headers: ['Option', 'Pays', 'Coverage level', 'Portability', 'Best for'],
        rows: [
          ['Individual disability', 'Monthly income', 'About 60% to 80% of income', 'Yours, even if you change jobs', 'Self-employed, professionals, specialists'],
          ['Group long-term disability', 'Monthly income', 'About 60% to 66% of income', 'Ends when you leave the employer', 'Employees who want a baseline'],
          ['Critical illness', 'One-time lump sum', 'Fixed benefit amount', 'Yours', 'Cash on a serious diagnosis'],
          ['EI sickness / CPP disability', 'Modest, limited-duration income', 'Capped, strict eligibility', 'Government program', 'A small safety net, not a plan'],
          ['Savings', 'Whatever you have', 'Depends on the account', 'Yours', 'Short gaps only'],
        ],
      },
      quickTakes: [
        'If your household lives on your paycheque, disability insurance protects the asset behind it.',
        'If you have group cover, check what it replaces and whether the benefit is taxable.',
        'If you are a specialist, own-occupation protection is usually worth the premium.',
        'If you want both fast cash and ongoing income, pair disability with critical illness.',
      ],
      honest: {
        lead: 'An honest weakness of disability cover:',
        text: 'it is detailed to buy and claims can be contested on the definition of disability. A policy that looks cheap may have a weaker definition, which is why the wording matters as much as the premium.',
      },
    },
  },

  // ───────────────────────────── Term life ─────────────────────────────
  'term-life': {
    photo: {
      heading: 'Room to grow, without the worry',
      caption:
        'A family outdoors in easy light. Term life is the plan that lets parents focus on the moment, knowing the mortgage and the future are covered.',
    },
    fromZero: {
      heading: 'Term life from zero',
      intro: [
        'Term life insurance is the simplest form of life insurance. You pick a coverage amount and a period (the term), and if you die within it, your beneficiaries receive the death benefit tax-free. If you outlive the term, the coverage ends.',
        'Because there is no savings or cash value, every dollar of premium buys pure protection. That makes it the cheapest way to get a large amount of cover for a defined period.',
      ],
      splitHeading: 'Every premium you pay is split two ways:',
      split: [
        { lead: 'Cost of insurance (COI)', text: 'the price of the death benefit, based on age, sex, health class, smoker status, coverage amount and term length.' },
        { lead: 'Charges', text: 'policy fees, admin costs and the insurer’s margin. There is no savings account, so nothing builds up.' },
      ],
      likes: [
        'The most coverage for the lowest starting premium',
        'Premium fixed for the whole term',
        'Often convertible to permanent cover without new health questions',
        'Simple to understand and compare',
      ],
      bites: [
        'Coverage ends when the term ends',
        'Renewal premiums jump sharply',
        'No cash value, so nothing back if you outlive the term',
        'A missed premium can lapse the policy',
      ],
      keyQuestion: {
        lead: 'The two numbers to always ask about:',
        text: 'the renewal premium at the end of the term, and the last age or date at which you can convert to permanent cover. These two decide what happens when the term ends.',
      },
      plainTerms:
        '“You are renting protection for a set number of years at a fixed price. If something happens in that window, your family receives the full amount. If nothing happens, the cover simply ends, like home insurance that you did not need to claim on.”',
    },
    structures: {
      heading: 'Term structures',
      intro: 'The term length and the way the premium is set are the biggest design choices, and they matter more the longer your need runs.',
      table: {
        headers: ['Structure', 'How it works', 'Pros', 'Cons'],
        rows: [
          ['Term 10 / 20 / 30', 'Level premium and level cover for the chosen term', 'Predictable, fits a known need like a mortgage', 'Ends at term end, renewal costs much more'],
          ['Yearly renewable term (YRT)', 'Premium recalculated each year and rises with age', 'Very cheap at first, no long commitment', 'Premiums climb steeply and become expensive'],
          ['Term to 65 / Term to 100', 'Level premium to a set age, or for life at Term 100', 'Covers a full working life, or a lifetime death benefit', 'Higher premium than a shorter term'],
          ['Decreasing term', 'Cover falls over time, often to match a loan', 'Low cost for a shrinking need', 'Cover declines even though the premium stays level'],
        ],
      },
      forYou: {
        lead: 'What it means for you:',
        text: 'match the term to the length of the obligation. A 25-year mortgage suggests a 20- to 25-year term, and young children suggest a similar window. Layering a long, smaller term with a shorter, larger one can be more efficient than one large policy.',
      },
      otherTerms: [
        { lead: 'Convertible:', text: 'lets you switch to permanent cover without a new medical, usually within a window and before a set age.' },
        { lead: 'Renewable:', text: 'lets you extend the term without new health questions, at a higher premium based on your age at renewal.' },
        { lead: 'Underwriting:', text: 'full medical, simplified or fully digital depending on the amount. Larger amounts usually need a paramedical exam.' },
        { lead: 'Smoker vs non-smoker:', text: 'smoking can roughly double the premium. A quit date and clean test can unlock the non-smoker rate.' },
        { lead: 'Riders:', text: 'optional add-ons such as waiver of premium, accidental death or child term cover.' },
      ],
    },
    inside: {
      heading: 'Options and riders inside the policy',
      intro: 'Term has no investment account, so the choices that matter sit in the options and riders. Insurers typically offer some mix of these.',
      table: {
        headers: ['Option / rider', 'What it does', 'Risk or cost', 'What to check'],
        rows: [
          ['Conversion privilege', 'Switch to permanent cover without new health questions', 'Permanent premium is much higher', 'Last convertible age and which products are allowed'],
          ['Waiver of premium', 'Waives premiums if you become totally disabled', 'Small add-on cost', 'Waiting period and definition of disability'],
          ['Accidental death benefit', 'Pays extra if death is accidental', 'Low value for most people', 'Exclusions and age limits'],
          ['Child term rider', 'Low-cost cover for children, convertible later', 'Small benefit amount', 'Conversion age and amount'],
          ['Return of premium', 'Refunds premiums if you outlive the term', 'Premium is often 2 to 3 times higher', 'Refund conditions and what happens if you cancel early'],
        ],
      },
      keyPoints: [
        { lead: 'Pure protection.', text: 'Every dollar buys cover, nothing builds up. That is why term is cheap and why it does not keep an asset for you.' },
        { lead: 'Renewal is the cliff.', text: 'Rates at renewal are based on your age then, with no discount for health. Know the number before you need it.' },
        { lead: 'Conversion is the lifeline.', text: 'If you might want permanent cover, check the conversion window and the products it allows.' },
        { lead: 'Coverage needs a calculation.', text: 'A common start is 7 to 10 times income, then adjust for debts, dependants and any existing group cover.' },
        { lead: 'Group cover is not enough.', text: 'It usually ends when you leave the job, and may be only one or two times salary.' },
      ],
      rule: {
        lead: 'Rule of thumb for comparison shopping:',
        text: 'compare the same amount, term, health class and smoker status across carriers, then check the renewal premium and the conversion deadline for each.',
      },
    },
    tax: {
      heading: 'Canadian tax rules',
      intro: 'Term life is simple on the tax side. The details change when a corporation or a lender is involved. Confirm specifics with an accountant.',
      rules: [
        { lead: 'Tax-free death benefit.', text: 'The death benefit paid to a named beneficiary is generally not taxable income.' },
        { lead: 'Premiums are generally not deductible.', text: 'For personally owned term, premiums are paid with after-tax dollars.' },
        { lead: 'Corporate-owned term and the CDA.', text: 'When a corporation owns the policy and is the beneficiary, the death benefit less ACB is credited to its Capital Dividend Account and can be paid out tax free to shareholders.' },
        { lead: 'Collateral insurance.', text: 'If a lender requires life insurance as security for a business loan, a portion of the premium may be deductible in certain cases. The rules are technical, so ask your accountant.' },
        { lead: 'No cash value to tax.', text: 'Because there is no savings component, there is no ACB to track and no growth to tax.' },
        { lead: 'Creditor protection.', text: 'A policy with a protected family-class beneficiary (spouse, child, grandchild or parent) may be protected from the owner’s creditors in provinces such as Ontario.' },
        { lead: 'Ownership and beneficiary.', text: 'Naming a beneficiary directly generally keeps the proceeds out of the estate, so they arrive faster and skip probate. Review the designation after any life change.' },
      ],
    },
    alternatives: {
      heading: 'How term compares with the alternatives',
      intro: 'Be ready to show term next to the other ways to do the same job. If term is not the best answer, say so.',
      table: {
        headers: ['Option', 'Guarantees', 'Cost', 'Cash value', 'Best for'],
        rows: [
          ['Term life', 'Fixed term, level premium', 'Lowest at the start', 'None', 'Temporary, large needs like a mortgage or young kids'],
          ['Term to 100 / non-par whole life', 'Lifetime cover, level premium', 'Medium', 'Little', 'The cheapest lifetime death benefit'],
          ['Universal life', 'Depends on account and funding', 'Higher', 'Yes, tax sheltered', 'Flexible permanent cover with savings'],
          ['Participating whole life', 'Guaranteed plus dividends', 'Highest', 'Yes, guaranteed', 'Guaranteed, low-maintenance legacy'],
          ['Group life at work', 'Usually 1 to 2 times salary', 'Employer-paid or low cost', 'None', 'A baseline, not a full plan'],
          ['Mortgage creditor insurance', 'Declines with the loan', 'Level premium', 'None', 'Simple lender-tied cover'],
        ],
      },
      quickTakes: [
        'If you need a large amount of cover for a fixed period, term is almost always the most efficient answer.',
        'If you want cover that never expires, consider term to 100 or permanent insurance.',
        'If you want your mortgage covered, individual term usually beats creditor insurance on flexibility.',
        'If you might want permanent cover later, buy term with a strong conversion option.',
      ],
      honest: {
        lead: 'An honest weakness of term:',
        text: 'most people outlive their term, so most term policies never pay a claim and leave nothing behind. That is exactly why it is cheap. The danger is letting it expire when you still need the cover and can no longer qualify.',
      },
    },
  },

  // ───────────────────────────── Annuities ─────────────────────────────
  annuities: {
    photo: {
      heading: 'A steady paycheque for the long walk',
      caption:
        'A retired couple on an unhurried walk. An annuity turns savings into an income that arrives on schedule, so the long view feels calm instead of uncertain.',
    },
    fromZero: {
      heading: 'Annuities from zero',
      intro: [
        'An annuity is a contract where you hand an insurer a lump sum and it promises you regular income, for life or for a set period. It is the closest thing to a private pension you can buy.',
        'The insurer pools many annuitants, so those who live longer are paid in part by those who do not. That risk-sharing is why a life annuity can pay more than you could safely withdraw from savings on your own.',
      ],
      splitHeading: 'Every payment you receive is made of three parts:',
      split: [
        { lead: 'Return of your capital', text: 'a slice of each payment is simply your own lump sum coming back to you.' },
        { lead: 'Interest', text: 'the insurer’s investment return on the money it holds while it pays you.' },
        { lead: 'Mortality credit', text: 'the extra from pooling. People who die early leave money in the pool for those who live longer.' },
      ],
      likes: [
        'Income you cannot outlive on a life annuity',
        'Predictable payments for essential expenses',
        'Joint and guarantee options protect a spouse or estate',
        'Minimal underwriting for standard annuities',
      ],
      bites: [
        'Usually irreversible, so you lose access to the lump sum',
        'Level payments lose buying power over time',
        'Payout rates depend on interest rates on the day you buy',
        'Without a guarantee period, payments can end soon after you die',
      ],
      keyQuestion: {
        lead: 'The two numbers to always ask about:',
        text: 'the monthly payment for each payout option (single life, joint, with guarantee), and how long you would need to live for the payments to exceed your lump sum.',
      },
      plainTerms:
        '“You hand over a lump sum and, in return, the insurer pays you a set amount every month. On a life annuity it keeps paying for as long as you live, so you never have to worry about running out.”',
    },
    structures: {
      heading: 'Payout structures',
      intro: 'How the payments are set is the biggest design choice in an annuity. Each option trades a higher monthly amount for more protection.',
      table: {
        headers: ['Structure', 'How it works', 'Pros', 'Cons'],
        rows: [
          ['Single life', 'Pays for your life only', 'Highest monthly payment', 'Payments stop at your death, nothing left for a spouse or estate'],
          ['Joint and survivor', 'Pays until the second spouse dies, often at a reduced amount to the survivor', 'Protects a spouse’s income', 'Lower monthly payment than single life'],
          ['Life with guarantee period', 'Pays for life, and continues to a beneficiary for 10 to 20 years if you die early', 'Protects against dying right after you buy', 'Lower monthly payment'],
          ['Term-certain', 'Pays for a fixed number of years, or to a set age', 'Good for bridging to CPP or OAS', 'No protection against outliving the term'],
          ['Indexed', 'Payments rise with inflation or a fixed percentage', 'Keeps up with rising costs', 'Starts lower and may take years to catch up'],
        ],
      },
      forYou: {
        lead: 'What it means for you:',
        text: 'most retirees annuitize only enough to cover essential fixed costs and keep the rest invested and flexible. Staggering purchases over several years can reduce the risk of buying at a low-rate moment. Ask for single, joint and guarantee quotes side by side.',
      },
      otherTerms: [
        { lead: 'Prescribed annuity:', text: 'a non-registered life annuity where the taxable portion is spread level over the years instead of front-loaded.' },
        { lead: 'Enhanced annuity:', text: 'pays more if health problems shorten life expectancy.' },
        { lead: 'Deferred annuity:', text: 'you pay now and income starts years later, locking in a payout for a future date.' },
        { lead: 'Payout frequency:', text: 'monthly, quarterly, semi-annual or annual. Monthly is most common.' },
        { lead: 'Underwriting:', text: 'minimal for a standard annuity because the insurer is not insuring your health. Enhanced annuities ask health questions.' },
      ],
    },
    inside: {
      heading: 'What backs the payments',
      intro: 'An annuity does not have investment accounts you choose from. The insurer invests your lump sum and promises the payments. These are the main ways that promise is built.',
      table: {
        headers: ['Type', 'What it does', 'Risk', 'What to check'],
        rows: [
          ['Fixed (level) annuity', 'Pays the same amount every period for the whole term', 'Inflation erodes buying power', 'Monthly payment, guarantee period, survivor option'],
          ['Indexed annuity', 'Payments step up each year by a set percentage', 'Starts lower, takes time to break even', 'Rate of increase and the break-even age'],
          ['Term-certain annuity', 'Pays over a fixed term whatever happens to you', 'Income ends at the end of the term', 'Term length and the cash-out value, if any'],
          ['Deferred annuity', 'Income begins at a future date', 'Locks in today’s rates for later income', 'Start date, surrender terms and death benefit before payout'],
        ],
      },
      keyPoints: [
        { lead: 'Rates drive payouts.', text: 'A higher interest rate on the day you buy means a higher payment for life. A low rate means a low payment.' },
        { lead: 'The insurer’s strength matters.', text: 'You are relying on the insurer to pay for decades. In Canada, Assuris provides protection if a life insurer fails, subject to limits.' },
        { lead: 'Longevity is the product.', text: 'An annuity wins if you live long and loses, financially, if you die early. A guarantee period softens that.' },
        { lead: 'It is only part of the plan.', text: 'Annuity income often pairs with CPP, OAS and a flexible RRIF or investment portfolio.' },
        { lead: 'Not a securities product.', text: 'Annuities are insurance contracts. The payments are a promise from the insurer, not a market return.' },
      ],
      rule: {
        lead: 'Rule of thumb for comparison shopping:',
        text: 'use the same lump sum, age, payout structure and guarantee period for every quote, then compare monthly payments and the insurer’s financial strength.',
      },
    },
    tax: {
      heading: 'Canadian tax rules',
      intro: 'Annuity tax depends on whether it is bought with registered or non-registered money. These are the core ideas, so have an accountant confirm before you commit.',
      rules: [
        { lead: 'Registered money is fully taxable.', text: 'An annuity bought with RRSP or RRIF funds pays income that is fully taxable in the year you receive it.' },
        { lead: 'Non-registered annuities are partly taxable.', text: 'Each payment is part return of your own capital (not taxed) and part interest (taxed). The split depends on the type of annuity.' },
        { lead: 'Prescribed annuities spread the tax evenly.', text: 'The taxable interest portion stays level each year, which avoids a heavy tax hit in the early years of a non-registered annuity.' },
        { lead: 'RRSP maturity.', text: 'An RRSP must be converted to income (a RRIF or an annuity) by the end of the year you turn 71. A life annuity is one of the ways to do that.' },
        { lead: 'Pension income credit and splitting.', text: 'Life annuity payments from a registered plan can qualify for the pension income credit and pension income splitting at age 65, which can lower a couple’s total tax.' },
        { lead: 'OAS clawback.', text: 'Annuity income counts toward net income, so large payments can trigger a reduction in Old Age Security.' },
        { lead: 'Death and estate.', text: 'If a guarantee period remains at death, the remaining payments go to the named beneficiary or the estate, and the tax rules depend on whether the money was registered.' },
      ],
    },
    alternatives: {
      heading: 'How annuities compare with the alternatives',
      intro: 'Be ready to show an annuity next to the other ways to fund retirement income. If an annuity is not the best answer, say so.',
      table: {
        headers: ['Option', 'Guarantees', 'Flexibility', 'Longevity protection', 'Best for'],
        rows: [
          ['Life annuity', 'Guaranteed income for life', 'Low, usually irreversible', 'Yes, you cannot outlive it', 'Essential fixed expenses'],
          ['RRIF', 'None, market based', 'High, with a minimum annual withdrawal', 'No, you can run out', 'Flexible income and estate value'],
          ['GIC ladder', 'Principal and interest (CDIC-eligible)', 'High at each maturity', 'No', 'Low-risk, short- to medium-term income'],
          ['Segregated fund with income guarantee', 'Income floor with market upside', 'Medium', 'Partly', 'Growth with a guaranteed income base'],
          ['CPP / OAS', 'Government income for life, inflation indexed', 'Low, but you choose when to start', 'Yes', 'A base layer, which grows if you delay'],
        ],
      },
      quickTakes: [
        'If you want income you cannot outlive for essential expenses, a life annuity is built for it.',
        'If you want flexibility and an estate, a RRIF or investments fit better.',
        'If you want a bit of both, annuitize a portion and keep the rest invested.',
        'If you are not yet 65 or rates are low, consider delaying CPP or staggering annuity purchases.',
      ],
      honest: {
        lead: 'An honest weakness of annuities:',
        text: 'they are irreversible and level payments lose buying power to inflation. Dying early can mean you received less than you paid. The right answer is usually a partial annuity, a guarantee period and an indexed option for part of the income.',
      },
    },
  },

  // ───────────────────────────── Mortgage / creditor ─────────────────────────────
  'mortgage-creditor': {
    photo: {
      heading: 'The home you are building toward',
      caption:
        'A Canadian home in warm daylight. Mortgage protection exists so the people inside it never have to leave because of a loan.',
    },
    fromZero: {
      heading: 'Mortgage and creditor insurance from zero',
      intro: [
        'Mortgage or creditor insurance is optional cover tied to a specific loan. If you die, and on some products if you become disabled or critically ill, it pays the lender to reduce or clear the balance.',
        'It is usually offered by the lender when you sign for the loan, and it is group cover the lender holds, not a standalone policy in your own name.',
      ],
      splitHeading: 'Every premium you pay is split three ways:',
      split: [
        { lead: 'Cost of the risk', text: 'the price of cover on your loan balance, usually based on age and the type of cover.' },
        { lead: 'Charges', text: 'the lender’s and insurer’s admin costs and the lender’s commission on the program.' },
        { lead: 'No savings', text: 'there is no cash value. The premium buys cover only, and the payout goes to the lender.' },
      ],
      likes: [
        'Easy to set up at the same time as the mortgage',
        'Simplified application, often just a few health questions',
        'Premium can be added to the mortgage payment',
        'Can include disability or critical illness',
      ],
      bites: [
        'Coverage shrinks as your balance falls, but the premium often does not',
        'Underwriting can happen at claim time, which can lead to denials',
        'The lender is the beneficiary, not your family',
        'It is tied to one loan and may not move with you',
      ],
      keyQuestion: {
        lead: 'The two numbers to always ask about:',
        text: 'the premium compared with an individual term policy for the same amount, and whether the application is underwritten upfront or after a claim.',
      },
      plainTerms:
        '“The lender holds a group policy. If you die, the insurer pays your mortgage balance to the lender. Your family keeps the house but receives no cash, and the cover shrinks as the mortgage shrinks.”',
    },
    structures: {
      heading: 'Coverage and premium structures',
      intro: 'How the cover and the premium are set decides how much value you get over the life of the mortgage.',
      table: {
        headers: ['Structure', 'How it works', 'Pros', 'Cons'],
        rows: [
          ['Decreasing cover, level premium', 'Cover falls with the balance, premium stays the same', 'Simple, premium is predictable', 'You pay the same for shrinking cover'],
          ['Decreasing cover, declining premium', 'Premium falls as the balance falls', 'Cost tracks the risk', 'Less common and may start higher'],
          ['Lender group policy', 'You are added to the lender’s master policy', 'Quick, no separate paperwork', 'Not portable, lender is the beneficiary'],
          ['Individual term (comparison)', 'A standalone policy in your own name', 'Level cover, you choose the beneficiary, portable', 'Usually needs full underwriting upfront'],
        ],
      },
      forYou: {
        lead: 'What it means for you:',
        text: 'creditor insurance is convenient but often costs more per dollar of cover than term and shrinks over time. If you are healthy, an individual term policy sized to your mortgage can offer level cover and flexibility. If your health makes term hard to get, creditor cover may be the only practical route.',
      },
      otherTerms: [
        { lead: 'Post-claim underwriting:', text: 'the insurer checks your health history after a claim, not at application. A missed disclosure can lead to a denial.' },
        { lead: 'Upfront underwriting:', text: 'the insurer checks your health at application, so approval is certain once issued. Ask which one applies.' },
        { lead: 'Portability:', text: 'creditor cover is tied to the loan. If you switch lenders or renew elsewhere, you may need to reapply.' },
        { lead: 'Optional coverages:', text: 'disability, critical illness and job-loss can be bundled, each with its own waiting period and exclusions.' },
        { lead: 'Beneficiary:', text: 'the lender is paid, not your family. Surplus after clearing the loan generally does not go to your estate.' },
      ],
    },
    inside: {
      heading: 'What to check inside the plan',
      intro: 'Creditor products look similar but differ in the fine print. These are the areas where plans diverge the most.',
      table: {
        headers: ['Feature', 'What it does', 'Risk', 'What to check'],
        rows: [
          ['Life cover', 'Pays the balance to the lender at death', 'Cover declines with the balance', 'Maximum amount and how it is calculated'],
          ['Disability cover', 'Pays the mortgage payments while you are disabled', 'Short benefit period, strict definitions', 'Waiting period, benefit length, definition'],
          ['Critical illness cover', 'Pays the balance or a set amount on diagnosis', 'Limited condition list', 'Which conditions and the survival period'],
          ['Underwriting method', 'Decides when your health is reviewed', 'Post-claim review can lead to denial', 'Ask for upfront underwriting'],
          ['Premium type', 'Sets how the cost changes as the balance falls', 'Level premium for shrinking cover', 'Whether the premium drops with the balance'],
        ],
      },
      keyPoints: [
        { lead: 'Post-claim underwriting is the big risk.', text: 'A claim can be denied years in if the insurer finds a health condition you did not disclose accurately.' },
        { lead: 'Compare cost per dollar of cover.', text: 'Convert the premium to a rate per $1,000 of cover, then compare with a term quote for the same age and amount.' },
        { lead: 'Check the exclusions.', text: 'Pre-existing conditions and job-loss cover often have waiting periods and limits.' },
        { lead: 'You may not need it.', text: 'If you already have enough life cover in your own name, creditor insurance can duplicate it.' },
        { lead: 'It is optional.', text: 'Lenders cannot require you to buy their insurance as a condition of the loan.' },
      ],
      rule: {
        lead: 'Rule of thumb for comparison shopping:',
        text: 'get the creditor quote and an individual term quote for the same amount, age and health class, then compare cost, underwriting timing and who receives the money.',
      },
    },
    tax: {
      heading: 'Canadian tax rules',
      intro: 'Mortgage insurance is simple on the tax side because there is no savings component. Confirm details for business loans with an accountant.',
      rules: [
        { lead: 'Death benefit is not taxable.', text: 'The life insurance payout to the lender is not taxable to you or your estate.' },
        { lead: 'Premiums are generally not deductible.', text: 'For a personal home mortgage, premiums are paid with after-tax dollars and are not deductible.' },
        { lead: 'Disability benefits.', text: 'If you pay the premium yourself, disability benefits that go toward your mortgage payments are generally not taxable. Employer-paid coverage is different.' },
        { lead: 'No cash value or ACB.', text: 'There is no savings component, so there is nothing to track for tax and no growth to report.' },
        { lead: 'Business loans.', text: 'For a business loan, a portion of premiums on collateral insurance may be deductible in some cases. The rules are technical, so confirm with an accountant.' },
        { lead: 'Estate impact.', text: 'Because the lender is paid directly, the proceeds do not pass through your estate. The mortgage is cleared, but your family receives no cash.' },
        { lead: 'Premium taxes.', text: 'Provincial taxes may apply to group insurance premiums. Check the certificate for the exact rate in your province.' },
      ],
    },
    alternatives: {
      heading: 'How creditor insurance compares with the alternatives',
      intro: 'Be ready to show creditor cover next to the other ways to protect a mortgage. If it is not the best answer, say so.',
      table: {
        headers: ['Option', 'Beneficiary', 'Cover over time', 'Underwriting', 'Best for'],
        rows: [
          ['Mortgage / creditor insurance', 'Lender', 'Declines with the loan', 'Often simplified, sometimes at claim', 'Quick setup, or when health makes term hard'],
          ['Individual term life', 'Whoever you name', 'Stays level', 'Upfront and certain once issued', 'Flexible, portable cover at a lower cost'],
          ['Group life at work', 'Whoever you name', 'Level, but often small', 'Light', 'A baseline that ends when you leave'],
          ['Term plus disability or critical illness', 'You, directly', 'Level benefit', 'Upfront', 'Full protection across risks'],
          ['Savings and extra payments', 'You', 'Grows as you save', 'None', 'A low-risk mortgage cushion over time'],
        ],
      },
      quickTakes: [
        'If you are healthy, an individual term policy is usually cheaper, more flexible and certain to pay.',
        'If your health is a concern, creditor cover may be the easiest way to get any cover.',
        'If you want the cash to go to your family, choose individual cover and name them.',
        'If you switch lenders often, avoid cover tied to a single loan.',
      ],
      honest: {
        lead: 'An honest weakness of creditor insurance:',
        text: 'it is easy to buy but often costs more per dollar and can be denied at claim time. Convenience is the main selling point, which is why comparing it to term before you sign is worth the effort.',
      },
    },
  },

  // ───────────────────────────── Group benefits ─────────────────────────────
  'group-benefits': {
    photo: {
      heading: 'A team that looks after its own',
      caption:
        'A small team working side by side. Group benefits are how a growing business shows its people it has their backs, from the first hire onward.',
    },
    fromZero: {
      heading: 'Group benefits from zero',
      intro: [
        'A group benefits plan lets an employer offer health, dental, life and disability cover to the team under one policy. Because the risk is pooled across the whole group, per-person pricing is usually lower and underwriting is lighter than buying the same cover one person at a time.',
        'It is also a hiring and retention tool. Good benefits can matter as much as salary to the people you want to keep.',
      ],
      splitHeading: 'Every premium dollar is split three ways:',
      split: [
        { lead: 'Claims', text: 'the money paid out for dental visits, prescriptions, life and disability claims. This is most of the premium.' },
        { lead: 'Administration', text: 'the insurer’s costs for enrolment, claims handling and customer service.' },
        { lead: 'Margin and reserves', text: 'the insurer’s profit and the buffer held for a bad claims year. In some plans, a surplus can be refunded.' },
      ],
      likes: [
        'Pooled pricing and light underwriting for most staff',
        'Employer premiums are generally a deductible business expense',
        'Employees generally do not pay tax on employer-paid health and dental',
        'A strong tool for hiring and keeping staff',
      ],
      bites: [
        'Coverage generally ends when an employee leaves',
        'Renewal rates can rise with claims experience',
        'Small groups may have limited plan choices',
        'Some benefits become taxable when the employer pays',
      ],
      keyQuestion: {
        lead: 'The two numbers to always ask about:',
        text: 'the premium per employee per month at each coverage level, and the renewal rate history, including how much the rate has risen after a claims-heavy year.',
      },
      plainTerms:
        '“You and your staff share one policy. The employer pays all or part of the premium, employees get health, dental and life cover at a group rate, and the plan renews each year based on how the group has used it.”',
    },
    structures: {
      heading: 'Plan funding structures',
      intro: 'How the plan is funded is the biggest design choice in a group benefits program, and it decides who carries the risk when claims run high.',
      table: {
        headers: ['Structure', 'How it works', 'Pros', 'Cons'],
        rows: [
          ['Fully insured', 'The insurer carries the claims risk and charges a premium that renews each year', 'Predictable cost, the insurer takes the risk', 'Premium includes a margin, and rates can rise after claims'],
          ['Administrative services only (ASO)', 'The employer pays claims as they happen and the insurer administers the plan', 'Lower cost when claims are low', 'Claims volatility falls on the employer, so it suits larger groups'],
          ['Health spending account (HSA)', 'The employer sets a dollar amount each employee can claim for eligible health costs', 'Controlled budget, flexible for staff', 'Employees can run out, and unused amounts may not carry over'],
          ['Pooled / experience-rated', 'The group’s own claims history influences renewal rates', 'Rewards a healthy group', 'A bad year can raise rates noticeably'],
        ],
      },
      forYou: {
        lead: 'What it means for you:',
        text: 'a very small business usually starts with a fully insured plan or a health spending account for predictability. As the team grows, a hybrid with more employer-controlled funding may save money. Ask for quotes on at least two structures and compare the cost under a normal year and a heavy-claims year.',
      },
      otherTerms: [
        { lead: 'Eligibility and waiting period:', text: 'who qualifies (full-time, part-time) and how long a new hire waits before coverage starts.' },
        { lead: 'Participation and minimums:', text: 'insurers often require a minimum number of enrolled employees, and light underwriting depends on it.' },
        { lead: 'Cost sharing:', text: 'the employer can pay all, some or none of the premium. Employee-paid options like voluntary cover are also common.' },
        { lead: 'Free cover limit:', text: 'the amount of life or disability cover an employee can receive without health questions.' },
        { lead: 'Conversion and portability:', text: 'when an employee leaves, ask whether they can convert group life to an individual policy without a medical.' },
      ],
    },
    inside: {
      heading: 'Benefits inside the plan',
      intro: 'A group plan is a bundle of separate coverages, each with its own limits. Employers typically choose some mix of these.',
      table: {
        headers: ['Benefit', 'What it does', 'Risk or limit', 'What to check'],
        rows: [
          ['Extended health', 'Reimburses prescriptions, paramedical care, vision and more', 'Annual maximums and coinsurance', 'Reimbursement percentage, drug formulary, annual limits'],
          ['Dental', 'Covers basic, major and sometimes orthodontic care', 'Annual maximum, fee guide lag', 'Percentages, annual maximum, fee guide year'],
          ['Group life and AD&D', 'Pays a benefit on death or accidental death', 'Often a small multiple of salary', 'Multiple of salary, age reductions, conversion rights'],
          ['Short- and long-term disability', 'Replaces income while an employee cannot work', 'Definition of disability, benefit cap', 'Waiting period, benefit percentage, how long it pays'],
          ['Critical illness (group)', 'Lump sum on diagnosis of a covered condition', 'Limited list and smaller amounts', 'Conditions covered and portability'],
          ['Health and wellness spending account', 'Flexible dollars for eligible health and wellness costs', 'Capped, may be use-it-or-lose-it', 'Eligible expenses and carry-forward rules'],
        ],
      },
      keyPoints: [
        { lead: 'Coverage is not portable.', text: 'Most group benefits end when the employee leaves, so individual cover for key people still matters.' },
        { lead: 'Renewals follow claims.', text: 'A year of heavy claims can push the next renewal up. Ask how rate increases are capped or smoothed.' },
        { lead: 'Free cover limits matter.', text: 'Above the limit, employees may need to answer health questions to get the full amount.' },
        { lead: 'Owner-employees count.', text: 'Incorporated owners can often join the plan as employees. Rules differ by insurer, so ask.' },
        { lead: 'Surveys help.', text: 'A short employee survey on what they value most can steer the design before you pay for benefits no one uses.' },
      ],
      rule: {
        lead: 'Rule of thumb for comparison shopping:',
        text: 'build one standard plan design (same percentages, maximums and waiting periods) and request quotes from every carrier on it, so the price comparison is fair.',
      },
    },
    tax: {
      heading: 'Canadian tax rules',
      intro: 'Group benefits have favourable tax treatment, but who pays the premium changes whether the benefit is taxable. Confirm the details with an accountant.',
      rules: [
        { lead: 'Employer premiums are deductible.', text: 'Premiums an employer pays for group health, dental, life and disability are generally a deductible business expense.' },
        { lead: 'Health and dental are generally not a taxable benefit.', text: 'Employer-paid premiums for a private health services plan are generally not taxed to the employee in most provinces. Quebec treats them as a taxable benefit.' },
        { lead: 'Employer-paid group life is a taxable benefit.', text: 'The employer’s premium for group term life is generally added to the employee’s income as a taxable benefit.' },
        { lead: 'Disability benefit taxation.', text: 'If the employer pays the disability premium, benefits are generally taxable. If the employee pays with after-tax dollars, benefits are generally tax free.' },
        { lead: 'Employee-paid premiums.', text: 'Employee-paid health and dental premiums can usually be claimed as medical expenses in the tax return, subject to the usual thresholds.' },
        { lead: 'Health spending accounts.', text: 'Eligible HSA reimbursements are generally tax free to the employee and deductible to the employer, as long as the plan follows CRA rules.' },
        { lead: 'Provincial premium taxes.', text: 'Some provinces charge sales tax or premium tax on group insurance premiums. Ontario, for example, applies a retail sales tax on group premiums, so ask for the all-in cost.' },
      ],
    },
    alternatives: {
      heading: 'How group benefits compare with the alternatives',
      intro: 'Be ready to show a group plan next to the other ways to give a team coverage. If a group plan is not the best answer, say so.',
      table: {
        headers: ['Option', 'Who is covered', 'Cost control', 'Portability', 'Best for'],
        rows: [
          ['Group benefits plan', 'Employees and often dependants', 'Premium sharing, light underwriting', 'Ends when employment ends', 'Teams of 2 or more that want broad cover'],
          ['Health spending account', 'Employees', 'Fixed budget set by the employer', 'Ends when employment ends', 'Very small teams and tight budgets'],
          ['Individual policies for each person', 'Each person separately', 'Priced individually, full underwriting', 'Stays with the person', 'Key people and owner-managers'],
          ['Provincial and government coverage only', 'Residents', 'No employer cost', 'Provincial', 'A baseline, with gaps for drugs, dental and vision'],
          ['Pay-raise instead of benefits', 'Employees', 'No plan to manage', 'N/A', 'When staff prefer cash and the team is tiny'],
        ],
      },
      quickTakes: [
        'If you want to attract and keep staff on a budget, a group plan is usually the best value.',
        'If your team is very small, a health spending account may be simpler.',
        'If a key person needs cover that follows them, add individual life or disability on top.',
        'If you are an incorporated owner, ask how you can be included and how it is taxed.',
      ],
      honest: {
        lead: 'An honest weakness of group plans:',
        text: 'coverage ends when employment ends, and renewals can rise sharply after a claims-heavy year. A group plan is a strong baseline, not a replacement for individual cover on the people you cannot afford to lose.',
      },
    },
  },
};

export function getInsuranceDeepDive(slug: string): ProductDeepDive | undefined {
  return insuranceDeepDives[slug];
}
