import { useEffect, useState } from 'react';

interface Rule {
  id: number;
  description: string;
  isSatisfied: boolean;
  imageUrl?: string;
}

interface RuleListProps {
  rules: Rule[];
}

const RuleList: React.FC<RuleListProps> = ({ rules }) => {
  const [displayedCount, setDisplayedCount] = useState(1);

  useEffect(() => {
    const allPreviousSatisfied = rules.slice(0, displayedCount).every(rule => rule.isSatisfied);
    if (allPreviousSatisfied && displayedCount < rules.length) {
      setDisplayedCount(displayedCount + 1);
    }
  }, [rules, displayedCount]);

  return (
    <ul>
      {rules.slice(0, displayedCount).map((rule) => (
        <li
          key={rule.id}
          className={rule.isSatisfied ? 'text-green-500' : 'text-red-500'}
        >
          {rule.description}
          {rule.imageUrl && <img src={rule.imageUrl} alt={rule.description} className="mt-2" />}
        </li>
      ))}
    </ul>
  );
};

export default RuleList;
