import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPopulationInsights, getMyInsights } from "../../store/network/insights";
import {
  Page,
  Header,
  Eyebrow,
  Title,
  Subtitle,
  Grid,
  Card,
  CardLabel,
  BigStat,
  StatCaption,
  BarRow,
  BarLabel,
  BarTrack,
  BarFill,
  BarValue,
  GaugeWrap,
  Gauge,
  GaugeHead,
  GaugeTrack,
  GaugeFill,
  GaugeKnob,
  Pill,
  CtaRow,
  CtaButton,
  Muted,
} from "./fit-insights.styles";

const MEASURE_LABELS = {
  heightCm: "Height",
  weightKg: "Weight",
  chestCm: "Chest",
  waistCm: "Waist",
  hipCm: "Hip",
  inseamCm: "Inseam",
  shoulderCm: "Shoulder",
};

const ordinal = (pct) => {
  const n = Math.round(pct);
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const FitInsights = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user?.tokens?.token);

  const [population, setPopulation] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const pop = await getPopulationInsights();
        if (alive) setPopulation(pop);
      } catch {
        /* surfaced via empty state below */
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!token) {
      setPersonal(null);
      return;
    }
    let alive = true;
    (async () => {
      try {
        const me = await getMyInsights(token);
        if (alive) setPersonal(me);
      } catch {
        if (alive) setPersonal(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [token]);

  const shapes = useMemo(
    () => (population?.shapeDistribution || []).filter((d) => d.pct > 0),
    [population]
  );
  const maxPct = useMemo(
    () => Math.max(1, ...shapes.map((d) => d.pct)),
    [shapes]
  );

  const myShape = personal?.bodyShape || null;

  return (
    <Page>
      <Header>
        <Eyebrow>Fit Insights</Eyebrow>
        <Title>Where your body sits in a crowd of thousands</Title>
        <Subtitle>
          Every recommendation in this store is grounded in a population of{" "}
          <strong>{population ? population.totalBodies.toLocaleString() : "—"}</strong>{" "}
          real, tape-measured bodies. Here is what that population looks like —
          and, once you've completed the fit wizard, exactly where you fall
          within it.
        </Subtitle>
      </Header>

      {loading && <Muted>Loading population analytics…</Muted>}

      {!loading && !population && (
        <Muted>Couldn't load insights right now. Please try again shortly.</Muted>
      )}

      {population && (
        <Grid>
          {/* Hero population stat */}
          <Card
            $span={4}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CardLabel>Reference population</CardLabel>
            <BigStat>{population.totalBodies.toLocaleString()}</BigStat>
            <StatCaption>
              real bodies (ANSUR II anthropometric survey) powering every fit
              and size decision.
            </StatCaption>
          </Card>

          {/* Shape distribution */}
          <Card
            $span={8}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <CardLabel>Body-shape distribution (FFIT)</CardLabel>
            {shapes.map((d, i) => {
              const active = d.shape === myShape;
              return (
                <BarRow key={d.shape}>
                  <BarLabel $active={active}>
                    {d.shape.replace("-", " ")}
                  </BarLabel>
                  <BarTrack>
                    <BarFill
                      $active={active}
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.pct / maxPct) * 100}%` }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.07 }}
                    />
                  </BarTrack>
                  <BarValue $active={active}>{d.pct}%</BarValue>
                </BarRow>
              );
            })}
          </Card>

          {/* Personalised section */}
          {personal ? (
            <>
              <Card
                $span={4}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <CardLabel>Your fit twins</CardLabel>
                <BigStat>{personal.fitTwins.toLocaleString()}</BigStat>
                <StatCaption>
                  shoppers share your measurements within a few centimetres
                  {personal.cohortFitPreference && (
                    <>
                      {" "}— and {personal.cohortFitPreference.pct}% of them prefer
                      a <strong>{personal.cohortFitPreference.fit}</strong> fit.
                    </>
                  )}
                </StatCaption>
              </Card>

              <Card
                $span={4}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <CardLabel>Your shape</CardLabel>
                <div style={{ margin: "6px 0 10px" }}>
                  <Pill>{(myShape || "unknown").replace("-", " ")}</Pill>
                </div>
                <StatCaption>
                  You're one of <strong>{personal.cohort.size.toLocaleString()}</strong>{" "}
                  {(myShape || "").replace("-", " ")} bodies —{" "}
                  {personal.cohort.pctOfPopulation}% of the population.
                </StatCaption>
              </Card>

              <Card
                $span={4}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <CardLabel>At a glance</CardLabel>
                <StatCaption style={{ marginTop: 4 }}>
                  {typeof personal.percentiles.heightCm === "number" && (
                    <>
                      Taller than{" "}
                      <strong>
                        {Math.round(personal.percentiles.heightCm * 100)}%
                      </strong>{" "}
                      of people.
                      <br />
                    </>
                  )}
                  {typeof personal.percentiles.waistCm === "number" && (
                    <>
                      Trimmer waist than{" "}
                      <strong>
                        {Math.round((1 - personal.percentiles.waistCm) * 100)}%
                      </strong>{" "}
                      of people.
                    </>
                  )}
                </StatCaption>
              </Card>

              {/* Percentile gauges */}
              <Card
                $span={12}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <CardLabel>Your measurements vs the population</CardLabel>
                <GaugeWrap>
                  {Object.entries(personal.percentiles).map(([key, p], i) => (
                    <Gauge key={key}>
                      <GaugeHead>
                        <span>{MEASURE_LABELS[key] || key}</span>
                        <span>{ordinal(p * 100)} percentile</span>
                      </GaugeHead>
                      <GaugeTrack>
                        <GaugeFill
                          initial={{ width: 0 }}
                          animate={{ width: `${p * 100}%` }}
                          transition={{ duration: 0.7, delay: 0.1 + i * 0.05 }}
                        />
                        <GaugeKnob
                          initial={{ left: 0 }}
                          animate={{ left: `${p * 100}%` }}
                          transition={{ duration: 0.7, delay: 0.1 + i * 0.05 }}
                        />
                      </GaugeTrack>
                    </Gauge>
                  ))}
                </GaugeWrap>
              </Card>
            </>
          ) : (
            <Card
              $span={12}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <CardLabel>See yourself in the data</CardLabel>
              <Muted style={{ marginTop: 6 }}>
                {currentUser
                  ? "Complete the 90-second fit wizard to unlock your personal percentile breakdown, body-shape cohort, and fit twins."
                  : "Sign in and complete the fit wizard to see your personal percentile breakdown, body-shape cohort, and fit twins."}
              </Muted>
              <CtaRow>
                <CtaButton
                  onClick={() => navigate(currentUser ? "/onboarding" : "/auth")}
                >
                  {currentUser ? "Start the fit wizard" : "Sign in to begin"}
                </CtaButton>
              </CtaRow>
            </Card>
          )}
        </Grid>
      )}
    </Page>
  );
};

export default FitInsights;
