interface NewsColumnProps {
    className?: string
  }
  
  const NewsColumn: React.FC<NewsColumnProps> = ({ className }) => {
    return (
      <aside className={`p-4 ${className}`}>
        <h2 className="text-xl font-bold mb-4">Latest News</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-600 hover:underline">Breaking News 1</a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">Trending Topic 2</a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">Popular Story 3</a>
          </li>
        </ul>
      </aside>
    )
  }
  
  export default NewsColumn